import React from 'react';

// SVG 图标组件
const RotateCwIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
const RotateCcwIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 1 9 9c-2.52 0-4.93-1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
const FlipHIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18" />
    <path d="M8 7l4-4 4 4" />
    <path d="M8 17l4 4 4-4" />
  </svg>
);
const FlipVIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h18" />
    <path d="M7 8l-4 4 4 4" />
    <path d="M17 8l4 4-4 4" />
  </svg>
);

// 放在文件顶部，确保全局可用
const FILTERS = [
  { key: 'normal', label: 'Normal', params: { brightness: 1, contrast: 1, saturation: 1, hue: 0 } },
  { key: 'bw', label: 'Black & White', params: { brightness: 1, contrast: 1, saturation: 0, hue: 0 } },
  { key: 'highcontrast', label: 'High Contrast', params: { brightness: 1.1, contrast: 1.8, saturation: 1, hue: 0 } },
  { key: 'sepia', label: 'Sepia', params: { brightness: 1.05, contrast: 1, saturation: 0.6, hue: 30 } },
  { key: 'cool', label: 'Cool Tone', params: { brightness: 1, contrast: 1, saturation: 1.2, hue: 200 } },
  { key: 'warm', label: 'Warm Tone', params: { brightness: 1.05, contrast: 1, saturation: 1.1, hue: 30 } },
  { key: 'fade', label: 'Fade', params: { brightness: 1.05, contrast: 0.8, saturation: 0.7, hue: 0 } },
];

// 通用菜单项组件
function DropdownMenuItem({ icon, text, selected, onClick, showIcon = true }: { icon?: React.ReactNode, text: string, selected?: boolean, onClick: () => void, showIcon?: boolean }) {
  return (
    <button
      className={`flex items-center w-full text-left px-4 py-2 text-sm font-medium border-b last:border-b-0 border-gray-100 bg-white transition-all duration-200 group hover:bg-gray-100 ${selected ? 'bg-gray-100' : ''}`}
      type="button"
      onClick={onClick}
    >
      {showIcon && icon && <span className="icon mr-3 transition-transform duration-200" style={{ width: 20, height: 20, display: 'inline-block' }}>{icon}</span>}
      <span className="text-[14px] text-gray-800 font-medium group-hover:translate-x-[2px] transition-transform duration-200">{text}</span>
    </button>
  );
}

// RotateDropdown
function RotateDropdown({ onRotateFlip }: { onRotateFlip: (type: 'cw' | 'ccw' | 'flipH' | 'flipV') => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-1 rounded border bg-white shadow-sm font-semibold text-base" onClick={() => setOpen((v) => !v)}>
        Rotate/Flip ▼
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-56 bg-white border rounded-xl shadow-lg z-10 min-w-[200px] overflow-hidden">
          <DropdownMenuItem icon={<RotateCwIcon />} text="Rotate 90°" onClick={() => { onRotateFlip('cw'); setOpen(false); }} selected={false} showIcon />
          <DropdownMenuItem icon={<RotateCcwIcon />} text="Rotate 90°" onClick={() => { onRotateFlip('ccw'); setOpen(false); }} selected={false} showIcon />
          <DropdownMenuItem icon={<FlipHIcon />} text="Flip Horizontal" onClick={() => { onRotateFlip('flipH'); setOpen(false); }} selected={false} showIcon />
          <DropdownMenuItem icon={<FlipVIcon />} text="Flip Vertical" onClick={() => { onRotateFlip('flipV'); setOpen(false); }} selected={false} showIcon />
        </div>
      )}
      <style>{`
        .icon {
          transition: transform 0.2s;
        }
        .group:hover .icon {
          transform: scale(1.1);
        }
        .group:hover .text {
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}


// PageSizeSelect
function PageSizeSelect({ pageSize, onPageSizeChange }: {
  pageSize: 'a4' | 'letter' | 'auto';
  onPageSizeChange: (size: 'a4' | 'letter' | 'auto') => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  const options = [
    { key: 'letter', label: 'Letter (US)' },
    { key: 'a4', label: 'A4' },
    { key: 'auto', label: 'Auto' },
  ];
  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-1 rounded border bg-white shadow-sm font-semibold text-base" onClick={() => setOpen((v) => !v)}>
        Page Size ▼
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-44 bg-white border rounded-xl shadow-lg z-10 min-w-[160px] overflow-hidden">
          {options.map(opt => (
            <DropdownMenuItem
              key={opt.key}
              text={opt.label}
              selected={opt.key === pageSize}
              onClick={() => {
                onPageSizeChange(opt.key as 'a4' | 'letter' | 'auto');
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// ColorAdjustDropdown
function ColorAdjustDropdown({ onColorAdjust, values }: { onColorAdjust: (key: 'brightness' | 'contrast' | 'saturation' | 'hue', value: number) => void, values?: Record<string, number> }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  const getActiveFilterKey = () => {
    if (!values) return '';
    for (const f of FILTERS) {
      if (
        values.brightness === f.params.brightness &&
        values.contrast === f.params.contrast &&
        values.saturation === f.params.saturation &&
        values.hue === f.params.hue
      ) {
        return f.key;
      }
    }
    return '';
  };
  const activeKey = getActiveFilterKey();
  const handleFilter = (params: Record<string, number>) => {
    onColorAdjust('brightness', params.brightness);
    onColorAdjust('contrast', params.contrast);
    onColorAdjust('saturation', params.saturation);
    onColorAdjust('hue', params.hue);
    setOpen(false);
  };
  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-1 rounded border bg-white shadow-sm font-semibold text-base" onClick={() => setOpen((v) => !v)}>
        Color Adjust ▼
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-44 bg-white border rounded-xl shadow-lg z-10 min-w-[160px] overflow-hidden">
          {FILTERS.map(f => (
            <DropdownMenuItem
              key={f.key}
              text={f.label}
              selected={activeKey === f.key}
              onClick={() => handleFilter(f.params)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// MarginSelect
function MarginSelect({ value, onChange }: { value: 'none' | 'small' | 'medium' | 'large', onChange: (value: 'none' | 'small' | 'medium' | 'large') => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  const options = [
    { key: 'none', label: 'None' },
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
  ];
  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-1 rounded border bg-white shadow-sm font-semibold text-base" onClick={() => setOpen((v) => !v)}>
        Margin ▼
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-36 bg-white border rounded-xl shadow-lg z-10 min-w-[120px] overflow-hidden">
          {options.map(opt => (
            <DropdownMenuItem
              key={opt.key}
              text={opt.label}
              selected={opt.key === value}
              onClick={() => { onChange(opt.key as 'none' | 'small' | 'medium' | 'large'); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// CutoutDropdown
function CutoutDropdown() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('ai');
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  const options = [
    { key: 'ai', label: 'AI Cutout' },
    { key: 'manual', label: 'Manual Cutout' },
  ];
  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-1 rounded border bg-white shadow-sm font-semibold text-base" onClick={() => setOpen((v) => !v)}>
        Cutout ▼
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-44 bg-white border rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
          {options.map(opt => (
            <DropdownMenuItem
              key={opt.key}
              text={opt.label}
              selected={opt.key === selected}
              onClick={() => { setSelected(opt.key); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditToolbar({ onRotateFlip, onColorAdjust, pageSize, onPageSizeChange, margin, onMarginChange }: {
  onRotateFlip: (type: 'cw' | 'ccw' | 'flipH' | 'flipV') => void;
  onColorAdjust: (key: 'brightness' | 'contrast' | 'saturation' | 'hue', value: number) => void;
  pageSize: 'a4' | 'letter' | 'auto';
  onPageSizeChange: (size: 'a4' | 'letter' | 'auto') => void;
  margin: 'none' | 'small' | 'medium' | 'large';
  onMarginChange: (value: 'none' | 'small' | 'medium' | 'large') => void;
}) {
  // 全局调色参数
  const [colorAdjust, setColorAdjust] = React.useState({ brightness: 1, contrast: 1, saturation: 1, hue: 0 });
  const handleColorAdjust = (key: 'brightness' | 'contrast' | 'saturation' | 'hue', value: number) => {
    setColorAdjust(prev => ({ ...prev, [key]: value }));
    onColorAdjust(key, value);
  };
  return (
    <div className="flex flex-wrap gap-2 py-0 justify-center items-center bg-transparent">
      <RotateDropdown onRotateFlip={onRotateFlip} />
      <PageSizeSelect pageSize={pageSize} onPageSizeChange={onPageSizeChange} />
      <ColorAdjustDropdown onColorAdjust={handleColorAdjust} values={colorAdjust} />
      <MarginSelect value={margin} onChange={onMarginChange} />
      {/* 暂时隐藏 Cutout 功能，待AI抠图功能完成后恢复 */}
      {/* <CutoutDropdown /> */}
    </div>
  );
} 