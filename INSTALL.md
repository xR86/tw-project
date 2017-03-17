
visual studio cmd:
set OCI_LIB_DIR=C:\<path>\dbhome_1\oci\lib\msvc
set OCI_INC_DIR=C:\<path>\dbhome_1\oci\include

set OCI_LIB_DIR=E:\zOracle\guest-x\product\11.2.0\dbhome_1\OCI\lib\MSVC
set OCI_INC_DIR=E:\zOracle\guest-x\product\11.2.0\dbhome_1\OCI\include

cmd:
npm config set python python2.7 && npm install


if setup doesn't work, then this might be a fix (unsafe):
https://github.com/oracle/node-oracledb/issues/18


https://github.com/nodejs/node-gyp/issues/746#issuecomment-281911560

fix:
https://github.com/nodejs/node-gyp/issues/577
https://github.com/oracle/node-oracledb/blob/master/INSTALL.md




CREATE USER ...
run tables
parse into tables
dmp file
delete tables
create dmp script
run with dmp file