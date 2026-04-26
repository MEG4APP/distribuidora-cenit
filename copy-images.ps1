$src = 'C:\Users\Usuario\Documents\Antigravity\Distribuidora-CENIT'
$dst = 'C:\Users\Usuario\Documents\Antigravity\cenit-web\public\products'

Get-ChildItem $src -Include '*.png','*.jpeg' -Recurse | ForEach-Object {
  $newName = $_.Name -replace ' ', '-'
  Copy-Item $_.FullName -Destination (Join-Path $dst $newName)
  Write-Host "Copied: $($_.Name) -> $newName"
}
Write-Host "All done!"
