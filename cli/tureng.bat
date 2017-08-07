echo off
set location=%~dp0
set arg1=%1
set arg1=%arg1:"=%
set arg2=%2
set arg2=%arg2:"=%
shift
shift
cls
node "%location%tureng.js" %arg1% %arg2%
