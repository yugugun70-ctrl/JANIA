'use client';

import { useState, useRef } from 'react';
import { Download, Save, Share2, Upload, Loader2 } from 'lucide-react';

type Category = 'tingkatkan' | 'kecantikan' | 'efek' | 'alat-ai';
type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('tingkatkan');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragZoneRef = useRef<HTMLDivElement>(null);

  const models: Record<Category, { id: string; name: string; icon: string }[]> = {
    tingkatkan: [
      { id: 'potret-hd', name: 'Potret HD', icon: '🖼️' },
      { id: 'wajah-alami', name: 'Wajah Alami', icon: '👤' },
      { id: 'detail-ultra', name: 'Detail Ultra', icon: '✨' },
      { id: 'pemulihan', name: 'Pemulihan', icon: '🔧' },
      { id: 'upscale', name: 'Upscale', icon: '📈' },
      { id: 'restore', name: 'Restore', icon: '♻️' },
    ],
    kecantikan: [
      { id: 'alami-beauty', name: 'Alami Beauty', icon: '🌸' },
      { id: 'gaya-korea', name: 'Gaya Korea', icon: '✨' },
      { id: 'kulit-jernih', name: 'Kulit Jernih', icon: '💫' },
      { id: 'lembut', name: 'Lembut', icon: '🎀' },
      { id: 'glowing', name: 'Glowing', icon: '💎' },
    ],
    efek: [
      { id: 'alami', name: 'Alami', icon: '🌿' },
      { id: 'vintage', name: 'Vintage', icon: '📷' },
      { id: 'fantasi-mimpi', name: 'Fantasi Mimpi', icon: '🌙' },
      { id: 'kota-cyber', name: 'Kota Cyber', icon: '🌆' },
      { id: 'retro', name: 'Retro', icon: '🎞️' },
      { id: 'cartoon', name: 'Cartoon', icon: '🎨' },
    ],
    'alat-ai': [
      { id: 'hapus-latar', name: 'Hapus Latar', icon: '🎯' },
      { id: 'ganti-latar', name: 'Ganti Latar', icon: '🖼️' },
      { id: 'hapus-objek', name: 'Hapus Objek', icon: '✂️' },
      { id: 'perluas-gambar', name: 'Perluas Gambar', icon: '📐' },
      { id: 'samakan-warna', name: 'Samakan Warna', icon: '🎨' },
    ],
  };

  const filteredModels = models[selectedCategory];

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragZoneRef.current) return;
    const rect = dragZoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setProcessingState('uploading');
      setTimeout(() => setProcessingState('idle'), 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragZoneRef.current?.classList.add('border-purple-400', 'bg-purple-500/10');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragZoneRef.current?.classList.remove('border-purple-400', 'bg-purple-500/10');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragZoneRef.current?.classList.remove('border-purple-400', 'bg-purple-500/10');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleApplyModel = (modelId: string) => {
    setSelectedModel(modelId);
    setProcessingState('processing');
    setTimeout(() => {
      setProcessingState('completed');
    }, 2000);
  };

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = `jania-result-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              JANIA
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">⚙️</button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">👤</button>
            <div className="text-sm text-white/80">💎 200 Kredit</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area or Preview */}
        {!uploadedFile ? (
          // Upload Drag & Drop Area
          <div
            ref={dragZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="mb-8 rounded-2xl overflow-hidden bg-black/40 backdrop-blur border-2 border-dashed border-white/20 hover:border-purple-400/50 transition-colors p-12 text-center cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">📤</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Unggah Foto atau Video</h2>
                <p className="text-white/60 mb-6">Drag & drop atau klik untuk memilih file</p>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row">
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  Unggah Foto
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  Unggah Video
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          // Preview Area
          <div className="mb-8 rounded-2xl overflow-hidden bg-black/40 backdrop-blur border border-white/10">
            <div
              ref={dragZoneRef}
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
                    src={previewUrl || ''}
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
                    src={previewUrl || ''}
                    alt="After"
                    className="w-full h-full object-cover"
                    style={{
                      width: `${100 / (sliderPosition / 100)}%`,
                      filter: processingState === 'completed' ? 'brightness(1.1) contrast(1.15) saturate(1.1)' : 'none',
                    }}
                  />
                  {processingState === 'processing' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-purple-400" size={40} />
                        <p className="text-white font-semibold">Memproses...</p>
                      </div>
                    </div>
                  )}
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
              </div>
            </div>
          </div>
        )}

        {/* Toolbar AI - Editor Tools */}
        <div className="mb-8 flex gap-2 sm:gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'tingkatkan', label: 'Tingkatkan', icon: '✨' },
            { id: 'kecantikan', label: 'Kecantikan', icon: '💄' },
            { id: 'efek', label: 'Efek', icon: '🎨' },
            { id: 'alat-ai', label: 'Alat AI', icon: '🔧' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as Category)}
              className={`px-5 sm:px-6 py-4 sm:py-3 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 transform hover:scale-105 min-h-16 sm:min-h-auto ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <span className="text-2xl sm:text-base">{cat.icon}</span>
              <span className="hidden sm:inline text-sm sm:text-base">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Model Cards - Dynamic Display */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {filteredModels.map((model) => (
              <button
                key={model.id}
                onClick={() => handleApplyModel(model.id)}
                disabled={!uploadedFile}
                className={`group p-0 sm:p-4 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 hover:border-purple-400/50 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-110 active:scale-95 min-h-48 sm:min-h-auto flex flex-col items-center justify-center overflow-hidden ${
                  !uploadedFile ? 'opacity-50 cursor-not-allowed' : ''
                } ${selectedModel === model.id ? 'border-purple-400 shadow-lg shadow-purple-500/30' : ''}`}
              >
                <div className="w-full h-28 sm:h-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-6xl sm:text-4xl group-hover:scale-110 transition-transform">{model.icon}</div>
                </div>
                <div className="p-4 sm:p-4 w-full text-center">
                  <div className="text-base sm:text-sm font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {model.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 sm:gap-3 flex-col sm:flex-row">
          <button
            onClick={handleDownload}
            disabled={processingState !== 'completed'}
            className={`flex-1 px-4 sm:px-6 py-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 min-h-18 sm:min-h-auto ${
              processingState !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Download size={28} />
            <span className="hidden sm:inline">Unduh HD</span>
            <span className="sm:hidden text-lg font-bold">Unduh</span>
          </button>
          <button
            disabled={!uploadedFile}
            className={`flex-1 px-4 sm:px-6 py-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 min-h-18 sm:min-h-auto ${
              !uploadedFile ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save size={28} />
            <span className="hidden sm:inline">Simpan Proyek</span>
            <span className="sm:hidden text-lg font-bold">Simpan</span>
          </button>
          <button
            disabled={!uploadedFile}
            className={`flex-1 px-4 sm:px-6 py-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 min-h-18 sm:min-h-auto ${
              !uploadedFile ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Share2 size={28} />
            <span className="hidden sm:inline">Bagikan</span>
            <span className="sm:hidden text-lg font-bold">Bagikan</span>
          </button>
        </div>

        {/* Status Info */}
        {uploadedFile && (
          <div className="mt-8 p-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
            <p className="text-white/80 text-sm">
              <span className="font-semibold">File:</span> {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            {selectedModel && (
              <p className="text-white/80 text-sm mt-2">
                <span className="font-semibold">Model:</span> {filteredModels.find(m => m.id === selectedModel)?.name}
              </p>
            )}
            {processingState === 'completed' && (
              <p className="text-green-400 text-sm mt-2 font-semibold">✓ Proses selesai! Siap untuk diunduh.</p>
            )}
          </div>
        )}
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-black/80 backdrop-blur border-l border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Menu</h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                Beranda
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                Proyek Saya
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
