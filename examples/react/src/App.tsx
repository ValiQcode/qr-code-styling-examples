import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import './App.css';
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Extension,
  Options
} from "qr-code-styling";

export default function App() {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: 'svg' as DrawType,
    data: 'http://qr-code-styling.com',
    image: '/favicon.ico',
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: 'Byte' as Mode,
      errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: '#222222',
      type: 'rounded' as DotType
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    cornersSquareOptions: {
      color: '#222222',
      type: 'extra-rounded' as CornerSquareType,
    },
    cornersDotOptions: {
      color: '#222222',
      type: 'dot' as CornerDotType,
    }
  });

  const [fileExt, setFileExt] = useState<Extension>("svg");
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(options => ({
      ...options,
      data: event.target.value
    }));
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as Extension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt
    });
  };

  // New event handlers for customization
  const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(options => ({
      ...options,
      dotsOptions: {
        ...options.dotsOptions,
        color: event.target.value
      }
    }));
  };

  const onBgColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(options => ({
      ...options,
      backgroundOptions: {
        ...options.backgroundOptions,
        color: event.target.value
      }
    }));
  };

  const onSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value, 10);
    setOptions(options => ({
      ...options,
      width: size,
      height: size
    }));
  };

  const onLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setOptions(options => ({
        ...options,
        image: imageURL
      }));
    }
  };

  return (
    <div className="App">
      <h2>QR Code Customizer</h2>
      <div ref={ref} />

      <div style={styles.inputWrapper}>
        {/* URL Input */}
        <input
          value={options.data}
          onChange={onDataChange}
          placeholder="Enter URL"
          style={styles.inputBox}
        />

        {/* Download Format Selector */}
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>

        {/* Download Button */}
        <button onClick={onDownloadClick}>Download</button>
      </div>

      {/* New Customization Inputs */}
      <div style={styles.customizationWrapper}>
        <label>Size (px):</label>
        <input type="range" min="100" max="500" value={options.width} onChange={onSizeChange} />

        <label>Dots Color:</label>
        <input type="color" value={options.dotsOptions?.color} onChange={onColorChange} />

        <label>Background Color:</label>
        <input type="color" value={options.backgroundOptions?.color} onChange={onBgColorChange} />

        <label>Upload Logo:</label>
        <input type="file" onChange={onLogoChange} />
      </div>
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "300px"
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20
  },
  customizationWrapper: {
    margin: "20px 0",
    display: "flex",
    flexDirection: "column" as 'column',  // Fixes the flexDirection type error
    gap: "10px",
    maxWidth: "300px"
  }
};