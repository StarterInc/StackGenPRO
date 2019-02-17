cd target

java -jar StarterIgnitePRO-1.2.1-SNAPSHOT.jar io.starter.ignite.generator.ReactGenerator -Dadmin.server.host=localhost -Dadmin.server.port=8009 -Dhostname=localhost -Dhostport=8009 -DMYBATIS_MAIN=gen/src/ -DMYBATIS_JAVA=gen/src/main/java/io/starter/ignite/model/ -Dio.starter.ignite.secure_key=oYID86q5zEfv75IMJIUuABi1yM36gv2N5CE1ILK431o= -DRDS_HOSTNAME=ls-094900477e4b2d50d66dddfaa480f1ac3415eb70.cci10ee08gpg.us-west-2.rds.amazonaws.com -DRDS_DB_NAME=CSAT -DRDS_USERNAME=colette -DRDS_PASSWORD=pr1nc3ss -DDBGEN_DROP_TABLE=true -DartifactId=CSAT -DschemaName=simple_cms.yml

# io.starter.ignite.generator.ReactGenerator
