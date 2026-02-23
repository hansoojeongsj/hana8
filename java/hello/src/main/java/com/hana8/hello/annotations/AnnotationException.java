package com.hana8.hello.annotations;

public class AnnotationException extends IllegalStateException {
	public AnnotationException(String msg) {
		super("Annotation Error: " + msg);
	}
}
