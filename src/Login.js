import React from 'react';
import { useState } from 'react';
import FileShareComponent from './FileShareComponent';
const Login = ({ setUserId }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const channelUrl = 'sendbird_group_channel_211821690_6e8f28d2d2bb5513eb5a13903cee3e23f00187dc';
    const connect = (e) => {
        e.preventDefault();
        setUserId(e.target.userId.value);
        if (audioBlob) {
            console.log('Audio Blob:', audioBlob);
        }
    };
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                const chunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                    setAudioBlob(audioBlob);
                    setAudioUrl(URL.createObjectURL(audioBlob));
                };

                mediaRecorder.start();
                setIsRecording(true);

                setTimeout(() => {
                    mediaRecorder.stop();
                    setIsRecording(false);
                }, 5000);
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    };


    return (
        <>

            <form onSubmit={connect}>
                <div className='bg-gray-100 rounded-md px-12 py-14 flex flex-col space-y-4 w-96'>
                    <div className='font-semibold text-2xl text-center'>
                        Authenticate with Sendbird
                    </div>
                    <div>
                        <label
                            htmlFor='userId'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            User ID
                        </label>
                        <div className='mt-2'>
                            <div className='flex rounded-md shadow-sm border border-gray-300 focus-within:border-indigo-600'>
                                <input
                                    type='text'
                                    id='userId'
                                    name='userId'
                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                    placeholder='Enter Your User ID...'
                                    required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-2'>
                            <button
                                type='submit'
                                className='rounded-md w-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'
                            >
                                Connect
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type='button'
                            onClick={startRecording}
                            className={`rounded-md w-full bg-${isRecording ? 'red' : 'green'}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${isRecording ? 'red' : 'green'}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${isRecording ? 'red' : 'green'}-600`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                    </div>

                    {audioUrl && (
                        <div>
                            <audio controls>
                                <source src={audioUrl} type='audio/wav' />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
            </form>
            <FileShareComponent channelUrl={channelUrl} />

        </>
    );
};

export default Login;