import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

const adjustmentTools = [
  { name: "Kecerahan", min: -100, max: 100, default: 0 },
  { name: "Kontras", min: -100, max: 100, default: 0 },
  { name: "Saturasi", min: -100, max: 100, default: 0 },
  { name: "Ketajaman", min: 0, max: 100, default: 0 },
  { name: "Highlight", min: -100, max: 100, default: 0 },
  { name: "Bayangan", min: -100, max: 100, default: 0 },
];

const enhanceTools = [
  { id: "face_4x", name: "Face Clear 4X" },
  { id: "face_v2_4x", name: "Face Natural 4X" },
  { id: "general_4x", name: "General Enhance 4X" },
  { id: "high_fidelity_4x", name: "High Fidelity 4X" },
  { id: "general_restore_4x", name: "General Restore 4X" }
];
const beautyTools = ["Kecantikan Alami", "Kecantikan Lembut", "Kulit Jernih", "Gaya Korea", "Gaya Jepang", "Glamor", "Elegan", "Tampilan Segar"];
const effectsTools = ["Alami", "Cahaya Lembut", "Vintage", "Kota Cyber", "Fantasi Mimpi", "Kartun", "Sketsa Pensil", "Cahaya Bulan", "Seni Pastel", "Mimpi Flora"];

export default function Editor() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("enhance");
  const [adjustments, setAdjustments] = useState<Record<string, number>>({
    Brightness: 0,
    Contrast: 0,
    Saturation: 0,
    Sharpen: 0,
    Highlights: 0,
    Shadows: 0,
  });
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Editor JANIA
          </h1>
        </div>
        <div className="text-sm text-gray-400">100%</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Adjustments */}
        <div className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-sm overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Penyesuaian</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const reset = Object.keys(adjustments).reduce((acc, key) => {
                    acc[key] = 0;
                    return acc;
                  }, {} as Record<string, number>);
                  setAdjustments(reset);
                }}
                className="h-8 px-2 text-xs hover:bg-white/10"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Atur Ulang
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {adjustmentTools.map((tool) => (
              <div key={tool.name}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-200">{tool.name}</label>
                  <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-2 py-1 rounded">
                    {adjustments[tool.name]}
                  </span>
                </div>
                <Slider
                  min={tool.min}
                  max={tool.max}
                  step={1}
                  value={[adjustments[tool.name]]}
                  onValueChange={(value) => setAdjustments({ ...adjustments, [tool.name]: value[0] })}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Preview */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-black/40 to-black/20 border-l border-r border-white/10">
          {/* Preview Header */}
          <div className="h-12 border-b border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <ZoomOut className="w-4 h-4 text-gray-300" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <ZoomIn className="w-4 h-4 text-gray-300" />
              </Button>
            </div>
            <div className="text-xs text-gray-400">Sebelum / Sesudah</div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center overflow-hidden p-6">
            <div className="relative w-full h-full max-w-4xl max-h-96 rounded-xl overflow-hidden border border-purple-500/30 bg-black/60 shadow-2xl shadow-purple-500/20">
              {/* Before/After Slider */}
              <div className="absolute inset-0 flex">
                {/* Before Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <span className="text-white font-semibold">Sebelum</span>
                </div>

                {/* After Image */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
                  style={{ width: `${sliderPos}%` }}
                >
                  <span className="text-white font-semibold">Sesudah</span>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize hover:bg-purple-300 transition-colors"
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startPos = sliderPos;
                    const container = e.currentTarget.parentElement;
                    if (!container) return;

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const deltaX = moveEvent.clientX - startX;
                      const containerRect = container.getBoundingClientRect();
                      const newPos = Math.max(0, Math.min(100, startPos + (deltaX / containerRect.width) * 100));
                      setSliderPos(newPos);
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleMouseMove);
                      document.removeEventListener("mouseup", handleMouseUp);
                    };

                    document.addEventListener("mousemove", handleMouseMove);
                    document.addEventListener("mouseup", handleMouseUp);
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-0.5 h-3 bg-gray-900" />
                      <div className="w-0.5 h-3 bg-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Footer */}
          <div className="h-20 border-t border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2 px-6 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 border border-white/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Tools */}
        <div className="w-64 border-l border-white/10 bg-black/20 backdrop-blur-sm flex flex-col">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b border-white/10 bg-black/30">
              <TabsTrigger value="enhance" className="flex-1">
                Tingkatkan
              </TabsTrigger>
              <TabsTrigger value="beauty" className="flex-1">
                Kecantikan
              </TabsTrigger>
              <TabsTrigger value="effects" className="flex-1">
                Efek
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex-1">
                Alat
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="enhance" className="m-0 p-4 space-y-2">
                {enhanceTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant="outline"
                    className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50"
                  >
                    {tool.name}
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="beauty" className="m-0 p-4 space-y-2">
                {beautyTools.map((tool) => (
                  <Button
                    key={tool}
                    variant="outline"
                    className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50"
                  >
                    {tool}
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="effects" className="m-0 p-4 space-y-2">
                {effectsTools.map((tool) => (
                  <Button
                    key={tool}
                    variant="outline"
                    className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50"
                  >
                    {tool}
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="tools" className="m-0 p-4 space-y-2">
                <Button variant="outline" className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50">
                  Potong
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50">
                  Putar
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs hover:bg-purple-500/20 hover:border-purple-500/50">
                  Balik
                </Button>
              </TabsContent>
            </div>
          </Tabs>

          {/* Apply Button */}
          <div className="p-4 border-t border-white/10 bg-gradient-to-t from-black/30 to-transparent">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold">
              Terapkan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
