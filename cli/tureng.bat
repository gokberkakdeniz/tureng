echo off
set location=%~dp0
set arg1=%1
shift
shift
cls
node "%location%tureng.js" %arg1%
