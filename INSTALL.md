# Installation (partial)

## node-oracledb and Oracle 11g

Run in **Visual Studio developer console** (cmd):  
`set OCI_LIB_DIR=C:\<path>\dbhome_1\oci\lib\msvc`  
`set OCI_INC_DIR=C:\<path>\dbhome_1\oci\include`

cmd:
`npm config set python python2.7 && npm install`

If setup doesn't work, then this might be a fix (unsafe):
+ https://github.com/oracle/node-oracledb/issues/18


https://github.com/nodejs/node-gyp/issues/746#issuecomment-281911560

fix:
+ https://github.com/nodejs/node-gyp/issues/577
+ https://github.com/oracle/node-oracledb/blob/master/INSTALL.md


**Database checkpoints**

CREATE USER ...  
run tables  
parse into tables  
dmp file  
delete tables  
create dmp script  
run with dmp file  
