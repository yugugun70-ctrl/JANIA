import { useState, useRef } from 'react';
import { Download, Share2, Save, Maximize2, Upload } from 'lucide-react';

type Category = 'tingkatkan' | 'kecantikan' | 'efek' | 'alat-ai';

interface Model {
  id: string;
  name: string;
  icon: string;
  category: Category;
}

const models: Model[] = [
  // Tingkatkan
  { id: 'potret-hd', name: 'Potret HD', icon: '🖼️', category: 'tingkatkan' },
  { id: 'wajah-alami', name: 'Wajah Alami', icon: '👤', category: 'tingkatkan' },
  { id: 'detail-ultra', name: 'Detail Ultra', icon: '✨', category: 'tingkatkan' },
  { id: 'pemulihan', name: 'Pemulihan', icon: '🔧', category: 'tingkatkan' },
  { id: 'upscale', name: 'Upscale', icon: '📈', category: 'tingkatkan' },
  { id: 'restore', name: 'Restore', icon: '♻️', category: 'tingkatkan' },
  
  // Kecantikan
  { id: 'alami-beauty', name: 'Alami Beauty', icon: '🌸', category: 'kecantikan' },
  { id: 'gaya-korea', name: 'Gaya Korea', icon: '🇰🇷', category: 'kecantikan' },
  { id: 'kulit-jernih', name: 'Kulit Jernih', icon: '✨', category: 'kecantikan' },
  { id: 'lembut', name: 'Lembut', icon: '☁️', category: 'kecantikan' },
  { id: 'glowing', name: 'Glowing', icon: '💫', category: 'kecantikan' },
  
  // Efek
  { id: 'alami', name: 'Alami', icon: '🌿', category: 'efek' },
  { id: 'vintage', name: 'Vintage', icon: '📸', category: 'efek' },
  { id: 'fantasi-mimpi', name: 'Fantasi Mimpi', icon: '🌙', category: 'efek' },
  { id: 'kota-cyber', name: 'Kota Cyber', icon: '🌃', category: 'efek' },
  { id: 'retro', name: 'Retro', icon: '🎬', category: 'efek' },
  { id: 'cartoon', name: 'Cartoon', icon: '🎨', category: 'efek' },
  
  // Alat AI
  { id: 'hapus-latar', name: 'Hapus Latar', icon: '🎯', category: 'alat-ai' },
  { id: 'ganti-latar', name: 'Ganti Latar', icon: '🖼️', category: 'alat-ai' },
  { id: 'hapus-objek', name: 'Hapus Objek', icon: '✂️', category: 'alat-ai' },
  { id: 'perluas-gambar', name: 'Perluas Gambar', icon: '📐', category: 'alat-ai' },
  { id: 'samakan-warna', name: 'Samakan Warna', icon: '🎨', category: 'alat-ai' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('tingkatkan');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredModels = models.filter(m => m.category === selectedCategory);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile(event.target?.result as string);
        setFileType(type);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', 'image/*');
      fileInputRef.current.click();
    }
  };

  const triggerVideoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', 'video/*');
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-x-hidden">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <span className="text-xl">≡</span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              JANIA
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
              <span>📤</span>
              <span>Unggah</span>
              <span className="text-xs">▼</span>
            </button>
            <button className="px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
              ⚙️
            </button>
            <button className="px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
              👤
            </button>
            <div className="px-3 py-2 text-sm flex items-center gap-1">
              <span>💎</span>
              <span>200 Kredit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Preview Workspace - FOKUS UTAMA */}
          <div className="mt-8 mb-8">
            {uploadedFile ? (
              // Uploaded file preview
              <div 
                className="relative w-full bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
                style={{ aspectRatio: '16 / 10' }}
              >
                {fileType === 'image' ? (
                  <img 
                    src={uploadedFile}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video 
                    src={uploadedFile}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setFileType(null);
                  }}
                  className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
                >
                  Ganti File
                </button>
              </div>
            ) : (
              // Demo preview
              <div 
                className="relative w-full bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
                style={{ aspectRatio: '16 / 10' }}
              >
                {/* Before/After Slider */}
                <div 
                  className="relative w-full h-full cursor-col-resize"
                  onMouseMove={handleSliderChange}
                  onClick={handleSliderChange}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663775397883/xdDWGOpRzLTmppPC.jpg"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-sm">
                      Sebelum
                    </div>
                  </div>

                  {/* After Image */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663775397883/xdDWGOpRzLTmppPC.jpg"
                      alt="After"
                      className="w-full h-full object-cover"
                      style={{ width: `${100 / (sliderPosition / 100)}%`, filter: 'brightness(1.1) contrast(1.15) saturate(1.1)' }}
                    />
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-sm">
                      Sesudah
                    </div>
                  </div>

                  {/* Slider Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 shadow-lg"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full border border-white/40 flex items-center justify-center">
                      <span className="text-white text-lg">◀ ▶</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur px-4 py-2 rounded-full">
                  <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">100%</button>
                  <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">Sesuai</button>
                  <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">1:1</button>
                  <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors flex items-center gap-1">
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Buttons - PROMINENT */}
          {!uploadedFile && (
            <div className="mb-8 flex gap-4 flex-col sm:flex-row">
              <button
                onClick={triggerPhotoUpload}
                className="flex-1 px-8 py-8 sm:py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl sm:text-lg rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <Upload size={36} />
                <span>Unggah Foto</span>
              </button>
              <button
                onClick={triggerVideoUpload}
                className="flex-1 px-8 py-8 sm:py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xl sm:text-lg rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <Upload size={36} />
                <span>Unggah Video</span>
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image')}
            className="hidden"
          />

          {/* Toolbar AI - Editor Tools - SCALED UP */}
          <div className="mb-8 flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'tingkatkan', label: 'Tingkatkan', icon: '✨' },
              { id: 'kecantikan', label: 'Kecantikan', icon: '💄' },
              { id: 'efek', label: 'Efek', icon: '🎨' },
              { id: 'alat-ai', label: 'Alat AI', icon: '🔧' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-6 sm:px-8 py-5 sm:py-4 rounded-lg font-bold text-lg sm:text-base whitespace-nowrap transition-all flex items-center gap-3 transform hover:scale-105 active:scale-95 min-h-20 sm:min-h-16 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <span className="text-3xl sm:text-2xl">{cat.icon}</span>
                <span className="hidden sm:inline text-base sm:text-lg">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Model Cards - Dynamic Display - SCALED UP */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
              {filteredModels.map((model) => (
                <button
                  key={model.id}
                  className="group p-0 sm:p-6 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 hover:border-purple-400/50 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-110 active:scale-95 min-h-56 sm:min-h-64 flex flex-col items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-7xl sm:text-6xl group-hover:scale-110 transition-transform">{model.icon}</div>
                  </div>
                  <div className="p-5 sm:p-6 w-full text-center">
                    <div className="text-lg sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {model.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons - SCALED UP */}
          <div className="flex gap-4 sm:gap-4 flex-col sm:flex-row">
            <button className="flex-1 px-6 sm:px-8 py-7 sm:py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg sm:text-base rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95">
              <Download size={32} />
              <span className="hidden sm:inline">Unduh HD</span>
              <span className="sm:hidden">Unduh</span>
            </button>
            <button className="flex-1 px-6 sm:px-8 py-7 sm:py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg sm:text-base rounded-lg transition-all border border-white/20 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95">
              <Save size={32} />
              <span className="hidden sm:inline">Simpan Proyek</span>
              <span className="sm:hidden">Simpan</span>
            </button>
            <button className="flex-1 px-6 sm:px-8 py-7 sm:py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg sm:text-base rounded-lg transition-all border border-white/20 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95">
              <Share2 size={32} />
              <span className="hidden sm:inline">Bagikan</span>
              <span className="sm:hidden">Bagikan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}>
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-white/10 p-4">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left">Beranda</button>
              <button className="w-full px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left">Proyek Saya</button>
              <button className="w-full px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left">Pengaturan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
