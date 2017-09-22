@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\tureng\bin\tureng" %*
) ELSE (
  node  "%~dp0\node_modules\tureng\bin\tureng" %*
)
