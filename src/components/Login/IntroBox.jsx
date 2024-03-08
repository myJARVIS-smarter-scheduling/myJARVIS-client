function IntroBox() {
  return (
    <section className="flex flex-col items-center">
      <div className="mb-5">
        <img
          src="/assets/myJARVIS_logo.png"
          alt="myJARVIS_logo"
          className="h-auto w-200"
        />
      </div>
      <div className="flex flex-col items-center space-y-10">
        <p className="text-2xl font-extrabold text-center">
          Smarter Scheduling, <br /> Better Living
        </p>
        <p className="text-xl text-center">
          <span className="font-bold text-center text-transparent from-logo_navy from-10% via-logo_blue via-50% to-logo_navy bg-gradient-to-r bg-clip-text">
            myJARVIS:
          </span>{" "}
          Smart Assistance at Your Fingertips
        </p>
      </div>
    </section>
  );
}

export default IntroBox;
