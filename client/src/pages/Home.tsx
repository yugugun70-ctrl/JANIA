import { useState } from 'react';
import { Download, Share2, Save, Maximize2 } from 'lucide-react';

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

  const filteredModels = models.filter(m => m.category === selectedCategory);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
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
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop"
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
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
                    alt="After"
                    className="w-full h-full object-cover"
                    style={{ width: `${100 / (sliderPosition / 100)}%` }}
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
          </div>

          {/* Toolbar AI - Editor Tools */}
          <div className="mb-8 flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'tingkatkan', label: 'Tingkatkan', icon: '✨' },
              { id: 'kecantikan', label: 'Kecantikan', icon: '💄' },
              { id: 'efek', label: 'Efek', icon: '🎨' },
              { id: 'alat-ai', label: 'Alat AI', icon: '🔧' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 transform hover:scale-105 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <span className="text-lg sm:text-base">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Model Cards - Dynamic Display */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredModels.map((model) => (
                <button
                  key={model.id}
                  className="group p-3 sm:p-4 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 hover:border-purple-400/50 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-110 active:scale-95"
                >
                  <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">{model.icon}</div>
                  <div className="text-xs sm:text-sm font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {model.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
            <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
              <Download size={18} />
              <span className="hidden sm:inline">Unduh HD</span>
              <span className="sm:hidden">Unduh</span>
            </button>
            <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
              <Save size={18} />
              <span className="hidden sm:inline">Simpan Proyek</span>
              <span className="sm:hidden">Simpan</span>
            </button>
            <button className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
              <Share2 size={18} />
              <span className="hidden sm:inline">Bagikan</span>
              <span className="sm:hidden">Bagikan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-br from-slate-900 to-purple-900 border-r border-purple-500/20 p-6 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-6">Menu</h3>
              {[
                { icon: '🏠', label: 'Beranda' },
                { icon: '⚙️', label: 'Pengaturan' },
                { icon: '📁', label: 'Proyek' },
                { icon: '❓', label: 'Bantuan' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-3 text-white"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
