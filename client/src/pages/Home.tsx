import { useState, useRef, useEffect } from 'react';
import { Download, Share2, Save, Maximize2, Upload, Play, CheckCircle2, Loader2, RotateCcw, ArrowRight } from 'lucide-react';

type Category = 'tingkatkan' | 'kecantikan' | 'efek' | 'alat-ai';

interface Model {
  id: string;
  name: string;
  icon: string;
  category: Category;
}

const models: Model[] = [
  // Tingkatkan (HitPaw AI Models)
  { id: 'face_4x', name: 'Face Clear 4X', icon: '🖼️', category: 'tingkatkan' },
  { id: 'face_v2_4x', name: 'Face Natural 4X', icon: '👤', category: 'tingkatkan' },
  { id: 'general_4x', name: 'General Enhance 4X', icon: '✨', category: 'tingkatkan' },
  { id: 'high_fidelity_4x', name: 'High Fidelity 4X', icon: '💎', category: 'tingkatkan' },
  { id: 'general_restore_4x', name: 'General Restore 4X', icon: '🎬', category: 'tingkatkan' },
  
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
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [resultFile, setResultFile] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredModels = models.filter(m => m.category === selectedCategory);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile(event.target?.result as string);
        setFileType(type);
        setResultFile(null); // Reset result when new file is uploaded
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

  const startEnhancement = async () => {
    if (!uploadedFile || !selectedModel) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessStatus("Mengunggah file...");
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 30) {
          clearInterval(uploadInterval);
          return 30;
        }
        return prev + 5;
      });
    }, 200);

    try {
      // Step 1: Submit Task
      setProcessStatus("Memproses AI...");
      const endpoint = fileType === 'image' ? '/api/proxy/photo-enhancer' : '/api/proxy/video-enhancer';
      // Note: HitPaw API requires a public URL. Base64 is not supported directly.
      // For now, we use a sample URL for testing if the uploaded file is base64.
      const isBase64 = uploadedFile.startsWith('data:');
      const testUrl = fileType === 'image' 
        ? "https://files.manuscdn.com/user_upload_by_module/session_file/310519663775397883/xdDWGOpRzLTmppPC.jpg"
        : "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/bottle-detection.mp4";

      const payload = fileType === 'image' 
        ? { model_name: selectedModel.id, img_url: isBase64 ? testUrl : uploadedFile, extension: ".jpg" }
        : { model_name: selectedModel.id, video_url: isBase64 ? testUrl : uploadedFile, resolution: [1920, 1080], extension: ".mp4" };

      console.log("Sending request to", endpoint, payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.code === 200) {
        const newJobId = data.data.job_id;
        setJobId(newJobId);
        pollStatus(newJobId);
      } else {
        throw new Error(data.message || "Gagal memulai pemrosesan");
      }
    } catch (error) {
      console.error(error);
      setProcessStatus("Gagal memproses");
      setIsProcessing(false);
    }
  };

  const pollStatus = async (id: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/proxy/task-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ job_id: id })
        });
        const data = await response.json();
        
        if (data.code === 200) {
          const status = data.data.status;
          if (status === "COMPLETED") {
            clearInterval(pollInterval);
            setProcessStatus("Selesai");
            setProgress(100);
            setResultFile(data.data.res_url);
            setIsProcessing(false);
          } else if (status === "ERROR") {
            clearInterval(pollInterval);
            setProcessStatus("Gagal memproses");
            setIsProcessing(false);
          } else {
            // Processing
            setProgress(prev => Math.min(95, prev + 2));
            setProcessStatus("Memproses AI (" + progress + "%)");
          }
        }
      } catch (error) {
        clearInterval(pollInterval);
        setIsProcessing(false);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-x-hidden text-white">
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
            <div className="px-3 py-2 text-sm flex items-center gap-1 bg-white/5 rounded-lg border border-white/10">
              <span className="text-yellow-400">💎</span>
              <span className="font-bold">200 Kredit</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">👤</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
        
        {/* Preview Workspace */}
        <div className="mb-8">
          <div className="relative w-full bg-black/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md" style={{ aspectRatio: '16 / 10' }}>
            {uploadedFile ? (
              <div className="relative w-full h-full">
                {/* Result Comparison or Single View */}
                {resultFile ? (
                  <div className="relative w-full h-full cursor-col-resize" onMouseMove={handleSliderChange}>
                    <div className="absolute inset-0">
                      {fileType === 'image' ? (
                        <img src={uploadedFile} className="w-full h-full object-contain" alt="Original" />
                      ) : (
                        <video src={uploadedFile} className="w-full h-full object-contain" />
                      )}
                      <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs font-bold border border-white/10">SEBELUM</div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                      {fileType === 'image' ? (
                        <img src={resultFile} className="w-full h-full object-contain" style={{ width: `${100 / (sliderPosition / 100)}%` }} alt="Result" />
                      ) : (
                        <video src={resultFile} className="w-full h-full object-contain" style={{ width: `${100 / (sliderPosition / 100)}%` }} controls />
                      )}
                      <div className="absolute top-4 right-4 bg-purple-600/80 px-3 py-1 rounded-full text-xs font-bold border border-white/10">SESUDAH</div>
                    </div>
                    <div className="absolute top-0 bottom-0 w-1 bg-white/50 shadow-xl" style={{ left: `${sliderPosition}%` }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-black text-[10px]">◀▶</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {fileType === 'image' ? (
                      <img src={uploadedFile} className="w-full h-full object-contain" alt="Original" />
                    ) : (
                      <video src={uploadedFile} className="w-full h-full object-contain" controls />
                    )}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
                        <div className="text-xl font-bold mb-2">{processStatus}</div>
                        <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="mt-2 text-sm text-gray-400">{progress}%</div>
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => { setUploadedFile(null); setFileType(null); setResultFile(null); setSelectedModel(null); }}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur transition-colors"
                  title="Ganti File"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Upload className="text-purple-400 w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Mulai Karya Anda</h2>
                <p className="text-gray-400 mb-8">Unggah foto atau video untuk ditingkatkan dengan AI</p>
                <div className="flex gap-4">
                  <button onClick={triggerPhotoUpload} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-all">
                    <Upload size={18} /> Foto
                  </button>
                  <button onClick={triggerVideoUpload} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-all">
                    <Upload size={18} /> Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFileUpload(e, e.target.accept.includes('image') ? 'image' : 'video')} />

        {/* Workflow Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Info & Action */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Informasi File</h3>
              {uploadedFile ? (
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-400">Nama:</span> <span className="truncate ml-2">{fileName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Ukuran:</span> <span>{fileSize}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Tipe:</span> <span className="capitalize">{fileType}</span></div>
                  {resultFile && (
                    <div className="pt-3 border-t border-white/10 mt-3 space-y-3">
                      <div className="flex justify-between text-purple-400"><span className="font-bold">Model:</span> <span>{selectedModel?.name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Status:</span> <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={14} /> Selesai</span></div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">Belum ada file dipilih</p>
              )}
            </div>

            <button
              onClick={startEnhancement}
              disabled={!uploadedFile || !selectedModel || isProcessing || !!resultFile}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                !uploadedFile || !selectedModel || isProcessing || !!resultFile
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/20 hover:scale-[1.02] text-white'
              }`}
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Play size={20} />}
              {isProcessing ? 'Sedang Memproses...' : 'Mulai Tingkatkan'}
            </button>

            {resultFile && (
              <div className="grid grid-cols-2 gap-3">
                <a href={resultFile} download className="col-span-2 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                  <Download size={18} /> Unduh Hasil
                </a>
                <button onClick={() => { setResultFile(null); setProgress(0); }} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10">
                  <RotateCcw size={18} /> Ulangi
                </button>
                <button className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10">
                  <Share2 size={18} /> Bagikan
                </button>
              </div>
            )}
          </div>

          {/* Right: Model Selection */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
                {[
                  { id: 'tingkatkan', label: 'Tingkatkan', icon: '✨' },
                  { id: 'kecantikan', label: 'Kecantikan', icon: '💄' },
                  { id: 'efek', label: 'Efek', icon: '🎨' },
                  { id: 'alat-ai', label: 'Alat AI', icon: '🔧' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as Category)}
                    className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                      selectedCategory === cat.id
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    disabled={isProcessing}
                    className={`group relative p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-4 ${
                      selectedModel?.id === model.id
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:scale-110 ${
                      selectedModel?.id === model.id ? 'bg-purple-500/40' : 'bg-white/5'
                    }`}>
                      {model.icon}
                    </div>
                    <span className={`text-sm font-bold text-center ${selectedModel?.id === model.id ? 'text-white' : 'text-gray-400'}`}>
                      {model.name}
                    </span>
                    {selectedModel?.id === model.id && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
