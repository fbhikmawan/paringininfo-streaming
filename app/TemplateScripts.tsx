import Script from 'next/script'

export default function TemplateScripts() {

  return (
    <>
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/popper.min.js" strategy="afterInteractive" />
    </>
  );
}
