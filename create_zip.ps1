Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "$PSScriptRoot\deploy_hostinger.zip"
if (Test-Path $zipPath) { 
    Remove-Item $zipPath -Force 
}

$distPath = "$PSScriptRoot\apps\web\dist"
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $distPath -Recurse -File -Force
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($distPath.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relativePath, [System.IO.Compression.CompressionLevel]::Optimal)
}

$zip.Dispose()
Write-Host "SUCCESS: deploy_hostinger.zip created with Linux forward slashes!"
