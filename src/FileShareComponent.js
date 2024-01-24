import React, { useState, useEffect } from 'react';
import SendBird from 'sendbird';

const FileShareComponent = ({ channelUrl }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [sendBirdConnection, setSendBirdConnection] = useState(null);

    useEffect(() => {
        const initializeSendBird = async () => {
            const sb = new SendBird({ appId: '5471A53B-063C-41C6-A75E-95332D3FC8C2' });

            try {
                await sb.connect('qwerty');
                setSendBirdConnection(sb);
            } catch (error) {
                console.error('SendBird connection error:', error);
            }
        };

        initializeSendBird();

        return () => {
            if (sendBirdConnection) {
                sendBirdConnection.disconnect();
            }
        };
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSendFile = () => {
        if (selectedFile && sendBirdConnection) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const dataUrl = reader.result;
                console.log(dataUrl, 'dataurl')
                sendFileMessage(dataUrl);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const sendFileMessage = async (dataUrl) => {
        console.log(dataUrl, 'dataUrl');

        if (!sendBirdConnection || !channelUrl) {
            console.error('SendBird connection or channel URL is missing.');
            return;
        }

        const sb = sendBirdConnection;

        try {
            const channel = await sb.GroupChannel.getChannel(channelUrl);

            const byteCharacters = atob(dataUrl.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const fileBlob = new Blob([byteArray], { type: 'application/octet-stream' });

            const file = new File([fileBlob], 'filename');

            const params = new sb.FileMessageParams();

            params.file = file;

            console.log(params.file, 'params.file');

            channel.sendFileMessage(params, (message, error) => {
                if (error) {
                    console.error('File message sending failed:', error);
                } else {
                    console.log('File message sent:', message);
                }
            });
        } catch (error) {
            console.error('Error fetching channel:', error);
        }
    };






    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSendFile}>Send File</button>
        </div>
    );
};

export default FileShareComponent;
