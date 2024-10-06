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
    data: 'https://qr-code-styling.com',
    image: '/favicon.ico',
    margin: 0,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: 'Byte' as Mode,
      errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: '#222222',
      type: 'extra-rounded' as DotType
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

  const [fileExt, setFileExt] = useState<Extension>("png");
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

  const onChange = (key: keyof Options, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <div ref={ref} className="qr-code-preview" />

      <div className="options-container">
        <div className="option-group">
          <h3>Main Options</h3>
          <label>Data</label>
          <input value={options.data} onChange={e => onChange("data", e.target.value)} placeholder="Enter URL" />

          <label>Image File</label>
          <input type="file" onChange={onFileChange} />

          <label>Width (px)</label>
          <input type="number" value={options.width} onChange={e => onChange("width", parseInt(e.target.value))} />

          <label>Height (px)</label>
          <input type="number" value={options.height} onChange={e => onChange("height", parseInt(e.target.value))} />

          <label>Margin (px)</label>
          <input type="number" value={options.margin} onChange={e => onChange("margin", parseInt(e.target.value))} />
        </div>

        <div className="option-group">
          <h3>Dots Options</h3>
          <label>Dots Style</label>
          <select value={options.dotsOptions?.type} onChange={e => onChange("dotsOptions", { ...options.dotsOptions, type: e.target.value })}>
            <option value="square">Square</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>

          <label>Dots Color</label>
          <input type="color" value={options.dotsOptions?.color} onChange={e => onChange("dotsOptions", { ...options.dotsOptions, color: e.target.value })} />
        </div>

        <div className="option-group">
          <h3>Corners Square Options</h3>
          <label>Square Style</label>
          <select value={options.cornersSquareOptions?.type} onChange={e => onChange("cornersSquareOptions", { ...options.cornersSquareOptions, type: e.target.value })}>
            <option value="square">Square</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>

          <label>Corners Square Color</label>
          <input type="color" value={options.cornersSquareOptions?.color} onChange={e => onChange("cornersSquareOptions", { ...options.cornersSquareOptions, color: e.target.value })} />
        </div>

        <div className="option-group">
          <h3>Corners Dot Options</h3>
          <label>Dot Style</label>
          <select value={options.cornersDotOptions?.type} onChange={e => onChange("cornersDotOptions", { ...options.cornersDotOptions, type: e.target.value })}>
            <option value="dot">Dot</option>
            <option value="square">Square</option>
          </select>

          <label>Corners Dot Color</label>
          <input type="color" value={options.cornersDotOptions?.color} onChange={e => onChange("cornersDotOptions", { ...options.cornersDotOptions, color: e.target.value })} />
        </div>

        <div className="option-group">
          <h3>Background Options</h3>
          <label>Background Color</label>
          <input type="color" value={options.backgroundOptions?.color} onChange={e => onChange("backgroundOptions", { ...options.backgroundOptions, color: e.target.value })} />
        </div>

        <div className="option-group">
          <h3>Image Options</h3>
          <label>Hide Background Dots</label>
          <input type="checkbox" checked={options.imageOptions?.hideBackgroundDots} onChange={e => onChange("imageOptions", { ...options.imageOptions, hideBackgroundDots: e.target.checked })} />

          <label>Image Size</label>
          <input type="number" value={options.imageOptions?.imageSize} step="0.1" min="0" max="1" onChange={e => onChange("imageOptions", { ...options.imageOptions, imageSize: parseFloat(e.target.value) })} />

          <label>Image Margin</label>
          <input type="number" value={options.imageOptions?.margin} onChange={e => onChange("imageOptions", { ...options.imageOptions, margin: parseInt(e.target.value) })} />
        </div>

        <div className="option-group">
          <h3>QR Options</h3>
          <label>Type Number</label>
          <input type="number" value={options.qrOptions?.typeNumber} onChange={e => onChange("qrOptions", { ...options.qrOptions, typeNumber: parseInt(e.target.value) })} />

          <label>Mode</label>
          <select value={options.qrOptions?.mode} onChange={e => onChange("qrOptions", { ...options.qrOptions, mode: e.target.value as Mode })}>
            <option value="Numeric">Numeric</option>
            <option value="Alphanumeric">Alphanumeric</option>
            <option value="Byte">Byte</option>
            <option value="Kanji">Kanji</option>
          </select>

          <label>Error Correction Level</label>
          <select value={options.qrOptions?.errorCorrectionLevel} onChange={e => onChange("qrOptions", { ...options.qrOptions, errorCorrectionLevel: e.target.value as ErrorCorrectionLevel })}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </div>

        <div className="option-group">
          <h3>Download Options</h3>
          <label>File Extension</label>
          <select value={fileExt} onChange={e => setFileExt(e.target.value as Extension)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="svg">SVG</option>
          </select>

          <button onClick={() => qrCode.download({ extension: fileExt })}>Download</button>
        </div>
      </div>
    </div>
  );
}