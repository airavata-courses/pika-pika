from subset import subset

def test_subset():
    assert isinstance(subset("noaa-nexrad-level2","2020/03/06/KBYX/KBYX20200306_000318_V06"),str)