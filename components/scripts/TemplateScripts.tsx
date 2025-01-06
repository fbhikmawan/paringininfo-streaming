import Script from 'next/script'

export default function TemplateScripts() {
  return (
    <>        
      <Script src="../../assets/js/vendor/jquery-3.6.0.min.js" />
      <Script src="../../assets/js/popper.min.js" />
      <Script src="../../assets/js/bootstrap.min.js" />
      <Script src="../../assets/js/jquery.magnific-popup.min.js" />
      <Script src="../../assets/js/main.js" />
    </>
  );
}

