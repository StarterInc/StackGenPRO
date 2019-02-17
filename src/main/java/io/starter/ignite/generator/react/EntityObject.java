package io.starter.ignite.generator.react;

public class EntityObject {

	public String objname;

	public EntityObject(String entityObjectName) {
		this.objname = entityObjectName;
	}

	@Override
	public String toString() {
		return this.objname;
	}
}