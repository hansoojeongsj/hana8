package com.hana8.hello.thread;

public class VirtualThread {
	public static void main(String[] args) {
		for (int i = 0; i < 100; i++) {
			final int ii = i;

			Thread.ofPlatform().start(() -> {
				Thread.ofPlatform().start(() -> {
					System.out.println("Thread " + ii);
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						throw new RuntimeException(e);
					}
				});
			});
		}
	}
}
