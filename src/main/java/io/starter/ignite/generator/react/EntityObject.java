package io.starter.ignite.generator.react;

public class EntityObject {

    public String objname;
    public int index = -1;

    public EntityObject(String entityObjectName, int idx) {
        this.objname = entityObjectName;
        this.index = idx;
    }

    @Override
    public String toString() {
        return this.objname;
    }
}