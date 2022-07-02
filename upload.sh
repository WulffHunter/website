echo Cleaning out the 'dist' folder on remote, please authenticate...
# Clean out the existing `dist` folder
ssh jaredrand.ca -t rm -i -f -- website/dist/*
echo Cleanup complete.
echo Please re-login to transfer documents.
# Upload the documents in the current `dist` folder
scp -r dist jaredrand.ca:website