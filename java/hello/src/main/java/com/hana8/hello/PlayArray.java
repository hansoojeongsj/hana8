package com.hana8.hello;

public class PlayArray {
	public static void main(String[] args) {
		int di = 0;
		while (true) {
			try {
				int[] iarr = new int[Integer.MAX_VALUE - ++di];
				System.out.printf("The End: %,d%n", iarr.length);
				break;
			} catch (OutOfMemoryError e) {
				System.out.println(" ⇒ " + e.getMessage());
			}
		}
	}
}
