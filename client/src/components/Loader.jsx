import TVKLogo from "../assets/tvk3.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/25 z-50">
      <div className="flex flex-col items-center gap-4">
        <img src={TVKLogo} alt="TVK Logo" className="w-32 animate-pulse" />

        <p>Connecting to TVK Services...</p>
      </div>
    </div>
  );
};

export default Loader;
