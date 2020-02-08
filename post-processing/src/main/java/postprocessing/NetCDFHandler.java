package postprocessing;

import ucar.nc2.NCdump;
import ucar.nc2.constants.FeatureType;
import ucar.nc2.dt.RadialDatasetSweep;
import ucar.nc2.dt.TypedDatasetFactory;
import ucar.nc2.util.CancelTask;

public class NetCDFHandler {

    public NetCDFHandler() {

	      try {

	        String fileIn = "/Users/akshay/Desktop/pika-pika/post-processing/KMKX20191225_105018_V06";
	      
	        CancelTask emptyCancelTask = new CancelTask() {
	            public boolean isCancel() {
	                return false;
	            }
	            public void setError(String arg0) {
	            }
				@Override
				public void setProgress(String arg0, int arg1){
				}
	        };


	      //  NCdump.print(fileIn, System.out);
	        // open the file and represent as a 
	        // RadialDatasetSweep object        
	        RadialDatasetSweep rds = (RadialDatasetSweep)
	            TypedDatasetFactory.open(
	               FeatureType.RADIAL, 
	               fileIn, 
	               emptyCancelTask,
	               new StringBuilder()
	            );


	        // radar information
	        String stationID      = rds.getRadarID();
	        String stationName    = rds.getRadarName();
	        boolean isVolume       = rds.isVolume();

	        System.out.println("stationID = "+stationID);
	        System.out.println("stationName = "+stationName);
	        System.out.println("isVolume = "+isVolume);
	        System.out.println("station location = "+
	            rds.getCommonOrigin());



	        // Read a radial variable
	        RadialDatasetSweep.RadialVariable varRef =
	            (RadialDatasetSweep.RadialVariable) 
	               rds.getDataVariable("Reflectivity");


	        // Read a single sweep
	        int sweepNum = 0;
	        RadialDatasetSweep.Sweep sweep = 
	            varRef.getSweep(sweepNum);

	        float meanElev = sweep.getMeanElevation();
	        int nrays = sweep.getRadialNumber();
	        float beamWidth = sweep.getBeamWidth();
	        int ngates = sweep.getGateNumber();
	        float gateSize = sweep.getGateSize();

	        System.out.println("meanElev = "+meanElev);
	        System.out.println("nrays = "+nrays);
	        System.out.println("beamWidth = "+beamWidth);
	        System.out.println("ngates = "+ngates);
	        System.out.println("gateSize = "+gateSize);


	         // Read data variable at radial level - 
	         // this is where actual data is read 
	         // into memory
	         for (int i = 0; i < nrays; i++) {
	             float azimuth = sweep.getAzimuth(i);
	             float elevation = sweep.getElevation(i);
	             float[] data = sweep.readData(i);

	             System.out.println("azimuth: " + azimuth);
				 System.out.println("elevation: " + elevation);
				 System.out.println("data: " + data.length);
	             // data.length should equal ngates

	         }
	         
	      } catch (Exception e) {
	          e.printStackTrace();
	      }
    }

}
