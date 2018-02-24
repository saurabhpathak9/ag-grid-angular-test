package aggridtest;

import java.util.Random;

public class GridDataUtil {

	final static int min = 100;
	final static int max = 100000;

	public static GridData getSampleData() {
		GridData data = new GridData();
		data.setId(String.valueOf(new Random().nextInt((10000) + 1) + 1));
		data.setValueA(getRandom());
		data.setValueB(getRandom());
		data.setValueC(getRandom());
		data.setValueD(getRandom());
		data.setValueE(getRandom());
		data.setValueF(getRandom());
		data.setValueG(getRandom());
		data.setValueH(getRandom());
		data.setValueI(getRandom());
		data.setValueJ(getRandom());
		return data;
	}

	private static String getRandom() {
		return String.valueOf(new Random().nextInt((max - min) + 1) + min);
	}

}
