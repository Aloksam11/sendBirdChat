import './App.css';
import CallButton from './CallButton';
function App() {
  const channelUrl = 'sendbird_open_channel_26714_930dd7beb8015b90cefaf56b1a0235a5cdb98e7c';
  return (
    <div className="App">
      <CallButton channelUrl={channelUrl} />
    </div>
  );
}

export default App;
