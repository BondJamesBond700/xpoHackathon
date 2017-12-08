package com.xpo.hackathon;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AppProperties {

	public String configObject(String parameter) {
		String value = null;
		try {
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream("config.properties");
			Properties properties = new Properties();
			properties.load(inputStream);
			value = properties.getProperty(parameter);
		} catch (FileNotFoundException exception) {
		} catch (IOException ex) {
		}
		return value;
	}

}
