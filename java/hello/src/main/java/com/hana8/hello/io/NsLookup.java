package com.hana8.hello.io;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class NsLookup {
	public static void main(String[] args) throws UnknownHostException {
		if (args.length < 1) {
			System.out.println("Input the domain!!");
			System.exit(0);
		}

		String domain = args[0].replaceAll("https?://([^/?]+).*", "$1");
		System.out.println("domain = " + domain);

		InetAddress[] ias = InetAddress.getAllByName(domain);
		for (InetAddress ia : ias) {
			System.out.println("HostName: " + ia.getHostName());
			System.out.println("HostAddr: " + ia.getHostAddress());
		}
	}
}
