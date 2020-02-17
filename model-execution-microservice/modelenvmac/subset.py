import boto3
import botocore
from botocore.client import Config
import matplotlib.pyplot as plt
from metpy.io import Level2File
from metpy.plots import add_timestamp, ctables
from mpl_toolkits.axes_grid1 import make_axes_locatable
import base64
import numpy as np
import json
import pyimgur
import time

# def decode_data(file_bytes):
# 	fh = open("imageToSave.png", "wb")
# 	fh.write(base64.b64decode(file_bytes))
# 	fh.close()

def send_imgur(file_path):
	CLIENT_ID = "77457873b7895a0"
	PATH = file_path

	im = pyimgur.Imgur(CLIENT_ID)
	uploaded_image = im.upload_image(PATH, title="Uploaded with PyImgur")
	print(uploaded_image.title)
	print(uploaded_image.link)
	print(uploaded_image.size)
	print(uploaded_image.type)
	return uploaded_image.link

def subset(s3_bucket,prefix):
	s3 = boto3.resource('s3', config=Config(signature_version=botocore.UNSIGNED,
	                                        user_agent_extra='Resource'))
	bucket = s3.Bucket(s3_bucket)
	for obj in bucket.objects.filter(Prefix=prefix):
		print(obj.key)

		# Use MetPy to read the file
		f = Level2File(obj.get()['Body'])

		sweep = 0
		# First item in ray is header, which has azimuth angle
		az = np.array([ray[0].az_angle for ray in f.sweeps[sweep]])

		# ref_hdr = f.sweeps[sweep][0][4][b'REF'][0]
		# ref_range = np.arange(ref_hdr.num_gates) * ref_hdr.gate_width + ref_hdr.first_gate
		# ref = np.array([ray[4][b'REF'][1] for ray in f.sweeps[sweep]])

		rho_hdr = f.sweeps[sweep][0][4][b'RHO'][0]
		rho_range = (np.arange(rho_hdr.num_gates + 1) - 0.5) * rho_hdr.gate_width + rho_hdr.first_gate
		rho = np.array([ray[4][b'RHO'][1] for ray in f.sweeps[sweep]])

		# phi_hdr = f.sweeps[sweep][0][4][b'PHI'][0]
		# phi_range = (np.arange(phi_hdr.num_gates + 1) - 0.5) * phi_hdr.gate_width + phi_hdr.first_gate
		# phi = np.array([ray[4][b'PHI'][1] for ray in f.sweeps[sweep]])

		zdr_hdr = f.sweeps[sweep][0][4][b'ZDR'][0]
		zdr_range = (np.arange(zdr_hdr.num_gates + 1) - 0.5) * zdr_hdr.gate_width + zdr_hdr.first_gate
		zdr = np.array([ray[4][b'ZDR'][1] for ray in f.sweeps[sweep]])
		ref_norm, ref_cmap = ctables.registry.get_with_steps('NWSReflectivity', 5, 5)

		# Plot the data!
		fig, axes = plt.subplots(1, 2, figsize=(15, 15))
		for var_data, var_range, colors, lbl, ax in zip((rho, zdr),
		                                                (rho_range, zdr_range),
		                                                ('plasma', 'viridis'),
		                                                ('RHO', 'ZDR (dBZ)'),
		                                                axes.flatten()):
		    # Turn into an array, then mask
		    data = np.ma.array(var_data)
		    data[np.isnan(data)] = np.ma.masked

		    # Convert az,range to x,y
		    xlocs = var_range * np.sin(np.deg2rad(az[:, np.newaxis]))
		    ylocs = var_range * np.cos(np.deg2rad(az[:, np.newaxis]))

		    # Define norm for reflectivity
		    norm = ref_norm if colors == ref_cmap else None

		    # Plot the data
		    a = ax.pcolormesh(xlocs, ylocs, data, cmap=colors, norm=norm)

		    divider = make_axes_locatable(ax)
		    cax = divider.append_axes('right', size='5%', pad=0.05)
		    fig.colorbar(a, cax=cax, orientation='vertical', label=lbl)

		    ax.set_aspect('equal', 'datalim')
		    ax.set_xlim(-100, 100)
		    ax.set_ylim(-100, 100)
		    add_timestamp(ax, f.dt, y=0.02, high_contrast=False)
		plt.suptitle('KVWX Level 2 Data', fontsize=20)
		plt.tight_layout()
		plt.plot()
		file_name='foo_'+str(int(time.time()))+'.png'
		plt.savefig(file_name)
		return send_imgur(file_name)
		# with open("foo.png", "rb") as imageFile:
		# 	str = base64.b64encode(imageFile.read())
		# 	return str
		# return bytes(az.tostring()+b'@'+rho_range.tostring()
		# +b'@'+rho.tostring())
		# return bytes(az.tostring())