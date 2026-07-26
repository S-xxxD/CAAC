$ErrorActionPreference = "Stop"
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $projectDir

$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (Test-Path -LiteralPath $bundledPython) {
    $python = $bundledPython
} else {
    $command = Get-Command python -ErrorAction SilentlyContinue
    if (-not $command) {
        throw "未找到 Python。请安装 Python 3 后重试。"
    }
    $python = $command.Source
}

Write-Host "CAAC 训练舱已启动：http://127.0.0.1:4173"
& $python -m http.server 4173 --bind 127.0.0.1
