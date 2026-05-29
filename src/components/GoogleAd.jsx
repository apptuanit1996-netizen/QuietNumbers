import React, { useEffect } from 'react';

const GoogleAd = ({ slot = "1234567890", format = "auto", layout = "", style = { display: 'block', width: '100%' } }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-3940256099942544"
      data-ad-slot={slot}
      data-ad-format={format}
      {...(layout ? { "data-ad-layout": layout } : {})}
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd;
