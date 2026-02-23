package com.hana8.hello.annotations;

public @interface MyAnnotation {
	String value() default "";

	int count() default 1;
}
