// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
// import {
//   Upload,
//   Leaf,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   BarChart3,
//   Zap,
//   Droplets,
//   Sun,
//   Moon,
//   Sparkles,
//   X,
//   Maximize2,
//   Loader2,
//   Dna,
//   Cpu,
//   Brain,
//   Microscope,
//   Wifi,
//   Database,
//   Shield,
//   Radar,
//   Bug,
// } from "lucide-react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Progress } from "@/components/ui/progress"
// import { useTheme } from "next-themes"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import { cn } from "@/lib/utils"

// interface PredictionResult {
//   id: string
//   file: File
//   imageUrl: string
//   predicted_class?: string
//   inference_time_seconds?: number
//   error?: string
//   isProcessing: boolean
// }

// interface PredictionStats {
//   total: number
//   successful: number
//   failed: number
//   avgTime: number
//   classCounts: Record<string, number>
// }

// interface LeafParticle {
//   id: number
//   x: number
//   y: number
//   size: number
//   rotation: number
//   speed: number
//   delay: number
// }

// interface LightParticle {
//   id: number
//   x: number
//   y: number
//   size: number
//   speed: number
//   delay: number
// }

// const COCONUT_ENDPOINT = "https://ff99-34-106-88-244.ngrok-free.app"
// const EGGPLANT_ENDPOINT = "https://placeholder-eggplant-endpoint.ngrok.app"

// const coconutTreatments = {
//   "Bud Root Dropping":
//     "🩺 **Problem:** Caused by poor soil drainage and fungal infection.\n✅ **Action:** Improve drainage around the palm's base and avoid overwatering.\n🛡️ **Treatment:** Apply a fungicide like Hexaconazole as a soil drench, following product guidelines.",
//   "Bud Rot":
//     "🩺 **Problem:** A fast-spreading fungal infection in the palm's crown.\n✅ **Action:** Immediately cut away and destroy all infected buds and surrounding leaves.\n🛡️ **Treatment:** Apply a copper-based fungicide, such as Bordeaux mixture, to the crown of the affected palm and any nearby healthy palms.",
//   "Gray Leaf Spot":
//     "🩺 **Problem:** A fungal disease often linked to nutrient deficiencies.\n✅ **Action:** Ensure the palm is well-fertilized, especially with potassium.\n🛡️ **Treatment:** For severe cases, apply a fungicide containing Mancozeb.",
//   "Leaf Rot":
//     "🩺 **Problem:** Fungal infection affecting the leaves.\n✅ **Action:** Prune and destroy all affected leaves immediately.\n🛡️ **Prevention:** Improve air circulation by clearing away dense undergrowth. In recurring cases, a fungicide like Propiconazole can be effective.",
//   "Stem Bleeding":
//     "🩺 **Problem:** A fungal infection causing a reddish-brown liquid to ooze from the trunk.\n✅ **Action:** Carefully scrape away the infected bark area until you see healthy tissue.\n🛡️ **Treatment:** Apply Bordeaux paste or a copper-based fungicide directly to the cleaned wound to prevent further infection.",
//   Healthy:
//     "✅ **Excellent Condition:** Your palm is healthy. Continue your current watering, fertilization, and maintenance schedule to keep it that way.",
// }

// const eggplantTreatments = {
//   Aphids:
//     "🩺 **Problem:** Small insects feeding on plant sap, often found under leaves.\n✅ **Action:** Spray the aphids off the leaves with a strong jet of water.\n🛡️ **Treatment:** For persistent infestations, apply Neem oil or insecticidal soap. Encourage beneficial insects like ladybugs.",
//   "Cercospora Leaf Spot":
//     "🩺 **Problem:** A fungal disease causing spots on the leaves.\n✅ **Action:** Remove and destroy heavily infected leaves.\n🛡️ **Prevention:** Improve air circulation by properly spacing plants and pruning lower leaves. A fungicide with Chlorothalonil can be used for widespread infection.",
//   "Defect Eggplant":
//     "🩺 **Problem:** Likely a calcium deficiency, also known as blossom-end rot.\n✅ **Action:** Ensure consistent watering to help with calcium uptake.\n🛡️ **Treatment:** Apply a calcium-rich foliar spray or amend the soil with a calcium supplement.",
//   "Flea Beetles":
//     "🩺 **Problem:** Small, dark beetles that chew numerous small holes in leaves.\n✅ **Action:** Apply Spinosad (an organic insecticide) or dust plants with diatomaceous earth.\n🛡️ **Prevention:** Use row covers on young plants to create a physical barrier.",
//   "Fresh Eggplant":
//     "✅ **Excellent Condition:** Your plant is healthy and thriving. Keep up the great work with your current care routine!",
//   "Fresh Eggplant Leaf":
//     "✅ **Excellent Condition:** Your plant is healthy and thriving. Keep up the great work with your current care routine!",
//   "Leaf Wilt":
//     "‼️ **CRITICAL ALERT: Verticillium or Fusarium Wilt Detected.** This soil-borne disease is incurable.\n❌ **Action:** Immediately remove and destroy the entire plant (do not compost). To prevent future issues, avoid planting eggplants, tomatoes, or peppers in this same spot for several years (crop rotation).",
//   "Phytophthora Blight":
//     "⚠️ **Warning: Advanced Blight Detected.** A serious water mold that rots the plant.\n✅ **Action:** Improve soil drainage immediately and avoid overhead watering.\n🛡️ **Treatment:** A fungicide with copper or phosphorous acid may help slow the spread on less affected plants.",
//   "Powdery Mildew":
//     "🩺 **Problem:** A white, powdery fungus on leaves and stems.\n✅ **Action:** Increase air circulation between plants and avoid getting leaves wet in the evening.\n🛡️ **Treatment:** Spray with Neem oil, potassium bicarbonate, or a specific fungicide for powdery mildew.",
//   "Tobacco Mosaic Virus":
//     "🦠 **CRITICAL ALERT: Virus Detected.** This disease has no cure and is highly contagious.\n❌ **Action:** Carefully remove and destroy the infected plant immediately. Wash your hands and disinfect any tools that touched the plant to avoid spreading it.",
// }
// export default function PlantDiseaseDetector() {
//   const { theme, setTheme } = useTheme()
//   const [selectedPlant, setSelectedPlant] = useState<"coconut" | "eggplant">("coconut")
//   const [files, setFiles] = useState<File[]>([])
//   const [predictions, setPredictions] = useState<PredictionResult[]>([])
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [processingProgress, setProcessingProgress] = useState(0)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [isHovering, setIsHovering] = useState(false)
//   const [leafParticles, setLeafParticles] = useState<LeafParticle[]>([])
//   const [lightParticles, setLightParticles] = useState<LightParticle[]>([])
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [isScanning, setIsScanning] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   // Handle mounting and window size
//   useEffect(() => {
//     setMounted(true)

//     const updateWindowSize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       })
//     }

//     if (typeof window !== "undefined") {
//       updateWindowSize()
//       window.addEventListener("resize", updateWindowSize)
//       return () => window.removeEventListener("resize", updateWindowSize)
//     }
//   }, [])

//   // Initialize background animations
//   useEffect(() => {
//     if (!mounted || windowSize.width === 0) return

//     const leaves = Array.from({ length: 20 }, (_, i) => ({
//       id: i,
//       x: Math.random() * windowSize.width,
//       y: -100,
//       size: Math.random() * 15 + 10,
//       rotation: Math.random() * 360,
//       speed: Math.random() * 1 + 0.5,
//       delay: Math.random() * 10,
//     }));

//     const lights = Array.from({ length: 15 }, (_, i) => ({
//       id: i,
//       x: Math.random() * windowSize.width,
//       y: windowSize.height - Math.random() * 300,
//       size: Math.random() * 4 + 2,
//       speed: Math.random() * 1 + 0.5,
//       delay: Math.random() * 5,
//     }))

//     setLeafParticles(leaves)
//     setLightParticles(lights)
//   }, [mounted, windowSize])

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || [])
//     const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"))
//     setFiles(imageFiles)
//     setPredictions([])
//     setIsScanning(true)
//     setTimeout(() => setIsScanning(false), 2000)
//   }

//   const handleDrop = (event: React.DragEvent) => {
//     event.preventDefault()
//     const droppedFiles = Array.from(event.dataTransfer.files)
//     const imageFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
//     setFiles(imageFiles)
//     setPredictions([])
//     setIsHovering(false)
//     setIsScanning(true)
//     setTimeout(() => setIsScanning(false), 2000)
//   }

//   const predictDiseases = async () => {
//     if (files.length === 0) return

//     setIsProcessing(true)
//     setProcessingProgress(0)

//     const endpoint = selectedPlant === "coconut" ? COCONUT_ENDPOINT : EGGPLANT_ENDPOINT

//     const initialPredictions: PredictionResult[] = files.map((file, index) => ({
//       id: `${index}-${file.name}`,
//       file,
//       imageUrl: URL.createObjectURL(file),
//       isProcessing: true,
//     }))

//     setPredictions(initialPredictions)

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i]
//       const formData = new FormData()
//       formData.append("file", file)

//       try {
//         const response = await fetch(`${endpoint}/predict`, {
//           method: "POST",
//           body: formData,
//         })

//         const data = await response.json()

//         setPredictions((prev) =>
//           prev.map((pred) =>
//             pred.id === `${i}-${file.name}`
//               ? {
//                 ...pred,
//                 predicted_class: response.ok ? data.predicted_class : undefined,
//                 inference_time_seconds: response.ok ? data.inference_time_seconds : undefined,
//                 error: response.ok ? undefined : data.error || "Prediction failed",
//                 isProcessing: false,
//               }
//               : pred,
//           ),
//         )
//       } catch (error) {
//         setPredictions((prev) =>
//           prev.map((pred) =>
//             pred.id === `${i}-${file.name}`
//               ? {
//                 ...pred,
//                 error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
//                 isProcessing: false,
//               }
//               : pred,
//           ),
//         )
//       }

//       setProcessingProgress(((i + 1) / files.length) * 100)
//     }

//     setIsProcessing(false)
//     setShowConfetti(true)
//     setTimeout(() => setShowConfetti(false), 5000)
//   }

//   const getStats = (): PredictionStats => {
//     const successful = predictions.filter((p) => p.predicted_class && !p.error).length
//     const failed = predictions.filter((p) => p.error).length
//     const avgTime =
//       predictions.filter((p) => p.inference_time_seconds).reduce((sum, p) => sum + (p.inference_time_seconds || 0), 0) /
//       successful || 0

//     const classCounts: Record<string, number> = {}
//     predictions.forEach((p) => {
//       if (p.predicted_class) {
//         classCounts[p.predicted_class] = (classCounts[p.predicted_class] || 0) + 1
//       }
//     })

//     return {
//       total: predictions.length,
//       successful,
//       failed,
//       avgTime,
//       classCounts,
//     }
//   }

//   const stats = getStats()
//   const treatments = selectedPlant === "coconut" ? coconutTreatments : eggplantTreatments

//   const clearFiles = () => {
//     setFiles([])
//     setPredictions([])
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-primary font-mono text-xl">INITIALIZING CORE SYSTEMS...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Plant-themed Background Effects */}
//       <div className="fixed inset-0 z-0">
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: "50px 50px",
//             backgroundPosition: "0 0",
//             animation: "gridMove 20s linear infinite",
//           }}
//         />
//         {leafParticles.map((leaf) => (
//           <div
//             key={leaf.id}
//             className="leaf-particle absolute pointer-events-none"
//             style={{
//               left: `${leaf.x}px`,
//               top: `${leaf.y}px`,
//               width: `${leaf.size}px`,
//               height: `${leaf.size}px`,
//               animationDelay: `${leaf.delay}s`,
//               animationDuration: `${20 / leaf.speed}s`,
//             }}
//           >
//             <Leaf
//               className="text-green-500 w-full h-full opacity-20"
//               style={{
//                 transform: `rotate(${leaf.rotation}deg)`,
//                 filter: "drop-shadow(0 0 5px rgba(34, 197, 94, 0.5))",
//               }}
//             />
//           </div>
//         ))}

//         {lightParticles.map((particle) => (
//           <div
//             key={particle.id}
//             className="light-particle absolute rounded-full pointer-events-none"
//             style={{
//               left: `${particle.x}px`,
//               bottom: `${particle.y}px`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               backgroundColor: "rgba(250, 204, 21, 0.7)",
//               boxShadow: "0 0 10px rgba(250, 204, 21, 0.8)",
//               animationDelay: `${particle.delay}s`,
//               animationDuration: `${8 / particle.speed}s`,
//             }}
//           />
//         ))}

//         <div className="absolute inset-0 overflow-hidden">
//           <div className="root-network">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="root"
//                 style={{
//                   left: `${20 + i * 15}%`,
//                   animationDelay: `${i * 0.5}s`,
//                   height: `${Math.random() * 30 + 40}%`,
//                 }}
//               >
//                 <div className="root-branch" style={{ left: "30%", height: "40%", animationDelay: "0.3s" }}>
//                   <div className="root-branch" style={{ left: "50%", height: "50%", animationDelay: "0.6s" }}></div>
//                 </div>
//                 <div className="root-branch" style={{ left: "70%", height: "60%", animationDelay: "0.9s" }}>
//                   <div className="root-branch" style={{ left: "40%", height: "40%", animationDelay: "1.2s" }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="relative z-10 min-h-screen">
//         <div className="fixed top-4 right-4 z-50">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                   className="rounded-full transparent-bg border-primary/20 hover:border-primary/40"
//                 >
//                   {theme === "dark" ? (
//                     <Sun className="h-5 w-5 text-yellow-500" />
//                   ) : (
//                     <Moon className="h-5 w-5 text-blue-600" />
//                   )}
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Toggle theme</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>

//         {showConfetti && (
//           <div className="fixed inset-0 pointer-events-none z-50">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.div
//                 initial={{ scale: 0, rotate: 0 }}
//                 animate={{ scale: 1, rotate: 360 }}
//                 transition={{ duration: 1, type: "spring" }}
//                 className="relative"
//               >
//                 <div className="absolute -inset-20 flex items-center justify-center">
//                   {Array.from({ length: 50 }).map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute w-3 h-3 rounded-full"
//                       initial={{
//                         opacity: 1,
//                         scale: 0,
//                         x: 0,
//                         y: 0,
//                         backgroundColor: ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"][
//                           Math.floor(Math.random() * 5)
//                         ],
//                       }}
//                       animate={{
//                         opacity: 0,
//                         scale: Math.random() * 2 + 1,
//                         x: (Math.random() - 0.5) * 300,
//                         y: (Math.random() - 0.5) * 300,
//                         rotate: Math.random() * 360,
//                       }}
//                       transition={{
//                         duration: 2 + Math.random(),
//                         ease: "easeOut",
//                         delay: Math.random() * 0.5,
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 1, scale: 1 }}
//                   animate={{ opacity: 0, scale: 1.5 }}
//                   transition={{ duration: 2 }}
//                   className="text-4xl font-bold text-primary"
//                 >
//                   <Sparkles className="h-16 w-16" />
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         )}

//         <div className="container mx-auto px-4 py-8 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, type: "spring" }}
//             className="text-center mb-8 md:mb-16 relative"
//           >
//             <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
//               <motion.div
//                 className="relative p-4 md:p-6 rounded-full transparent-bg border border-primary/30"
//                 whileHover={{ scale: 1.1, rotate: 10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Leaf className="h-12 w-12 md:h-16 md:w-16 text-primary" />
//               </motion.div>

//               <div className="text-center">
//                 <motion.h1
//                   className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-2 md:mb-4"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3, duration: 0.8 }}
//                 >
//                   NEURAL PLANT
//                 </motion.h1>
//                 <motion.h2
//                   className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2"
//                   initial={{ opacity: 0, x: -100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.5, duration: 0.8 }}
//                 >
//                   DISEASE DETECTOR
//                 </motion.h2>
//                 <motion.div
//                   className="text-primary font-mono text-sm md:text-lg tracking-wider"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.7, duration: 0.8 }}
//                 >
//                   [NEURAL ENHANCED • BIOTECH READY ]
//                 </motion.div>
//               </div>
//             </div>

//             <motion.p
//               className="text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground leading-relaxed font-light px-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9, duration: 0.8 }}
//             >
//               Revolutionary bio-synthetic neural networks for
//               <span className="text-green-500 font-semibold"> high-precision, real-time </span>
//               plant pathogen detection and
//               <span className="text-blue-500 font-semibold"> molecular-level analysis</span>
//             </motion.p>

//             <motion.div
//               className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.1, duration: 0.8 }}
//             >
//               {[
//                 { icon: Brain, label: "AI CORE", status: "ONLINE", color: "text-green-500" },
//                 { icon: Cpu, label: "DEEP CORE", status: "ACTIVE", color: "text-blue-500" },
//                 { icon: Shield, label: "SECURITY", status: "SECURE", color: "text-purple-500" },
//                 { icon: Wifi, label: "NEURAL LINK", status: "CONNECTED", color: "text-yellow-500" },
//               ].map((item, index) => (
//                 <div key={index} className="text-center">
//                   <item.icon className={cn("h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 animate-pulse", item.color)} />
//                   <div className="text-xs font-mono text-muted-foreground">{item.label}</div>
//                   <div className={cn("text-xs font-bold", item.color)}>{item.status}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1.3, duration: 0.5 }}
//             className="mb-8 md:mb-12"
//           >
//             <Alert className="transparent-bg border-amber-500/50 text-amber-600 dark:text-amber-200">
//               <AlertTriangle className="h-5 w-5 text-amber-500 animate-pulse" />
//               <AlertDescription className="font-mono text-sm md:text-base">
//                 <strong className="text-amber-500">[CRITICAL NOTICE]</strong> This system provides advanced AI analysis
//                 for research purposes. Always consult certified agricultural experts for final diagnosis and treatment
//                 protocols.
//                 <span className="text-amber-500 ml-2 block md:inline">• CLASSIFICATION LEVEL: EXPERIMENTAL •</span>
//               </AlertDescription>
//             </Alert>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.5, duration: 0.8 }}
//             className="mb-8 md:mb-12"
//           >
//             <Card className="transparent-bg border border-primary/30 overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
//                   <Dna className="h-6 w-6 md:h-8 md:w-8 text-primary animate-spin" />
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500 text-center md:text-left">
//                     BIOLOGICAL TARGET SELECTION
//                   </span>
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground font-mono text-center md:text-left">
//                   Initialize hyperspectral scanning protocols for target organism classification
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs
//                   value={selectedPlant}
//                   onValueChange={(value) => setSelectedPlant(value as "coconut" | "eggplant")}
//                   className="w-full"
//                 >
//                   <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 transparent-bg border border-primary/30">
//                     <TabsTrigger
//                       value="coconut"
//                       className="data-[state=active]:bg-green-600 data-[state=active]:text-white font-mono text-xs md:text-sm"
//                     >
//                       <div className="flex items-center gap-2 md:gap-3">
//                         <Image
//                           src="/coconut-tree.png"
//                           alt="Coconut Tree"
//                           width={20}
//                           height={20}
//                           className="h-4 w-4 md:h-6 md:w-6 object-contain"
//                         />
//                         <span className="hidden md:inline">COCOS NUCIFERA</span>
//                         <span className="md:hidden">COCONUT</span>
//                       </div>
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="eggplant"
//                       className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-mono text-xs md:text-sm"
//                     >
//                       <div className="flex items-center gap-2 md:gap-3">
//                         <Image
//                           src="/eggplant-image.png"
//                           alt="Eggplant"
//                           width={20}
//                           height={20}
//                           className="h-4 w-4 md:h-6 md:w-6 object-contain"
//                         />
//                         <span className="hidden md:inline">SOLANUM MELONGENA</span>
//                         <span className="md:hidden">EGGPLANT</span>
//                       </div>
//                     </TabsTrigger>
//                   </TabsList>

//                   <div className="relative overflow-hidden rounded-2xl">
//                     <AnimatePresence mode="wait">
//                       {selectedPlant === "coconut" ? (
//                         <motion.div
//                           key="coconut"
//                           initial={{ opacity: 0, x: -50 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 50 }}
//                           transition={{ duration: 0.6, type: "spring" }}
//                         >
//                           <div className="rounded-2xl p-4 md:p-8 border-none">
//                             <div className="flex flex-col items-center gap-4">
//                               <div className="text-center w-full">
//                                 <h3 className="text-xl md:text-3xl font-bold text-green-500 mb-2 md:mb-4 font-mono">
//                                   COCONUT ANALYSIS PROTOCOL
//                                 </h3>
//                                 <p className="text-green-600 dark:text-green-200/80 mb-4 md:mb-6 text-sm md:text-lg">
//                                   Advanced pathogen detection for tropical palm species with neural-synthesis imaging:
//                                 </p>
//                               </div>

//                               <div className="flex flex-col lg:flex-row items-center w-full gap-4">
//                                 <div className="flex-1 w-full">
//                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full">
//                                     {["Bud Rot", "Gray Leaf Spot", "Stem Bleeding", "Leaf Rot"].map(
//                                       (disease, index) => (
//                                         <motion.div
//                                           key={disease}
//                                           initial={{ opacity: 0, scale: 0.8 }}
//                                           animate={{ opacity: 1, scale: 1 }}
//                                           transition={{ delay: index * 0.1 }}
//                                           className="w-full"
//                                         >
//                                           <Badge
//                                             variant="outline"
//                                             className="bg-emerald-950/50 text-emerald-300 border-emerald-700/80 px-2 md:px-4 py-2 md:py-2 font-mono text-xs md:text-sm w-full justify-center min-h-[40px] flex items-center"
//                                           >
//                                             <Microscope className="h-3 w-3 mr-1 md:mr-2 flex-shrink-0" />
//                                             <span className="text-center">{disease}</span>
//                                           </Badge>
//                                         </motion.div>
//                                       ),
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="flex-shrink-0 mt-4 lg:mt-0">
//                                   <motion.div
//                                     className="w-20 h-20 md:w-32 md:h-32 rounded-full transparent-bg border-2 border-green-500/50 flex items-center justify-center"
//                                     whileHover={{ scale: 1.1, rotate: 360 }}
//                                     transition={{ duration: 2 }}
//                                   >
//                                     <Image
//                                       src="/coconut-tree.png"
//                                       alt="Coconut Tree"
//                                       width={48}
//                                       height={48}
//                                       className="h-12 w-12 md:h-20 md:w-20 object-contain"
//                                     />
//                                   </motion.div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ) : (
//                         <motion.div
//                           key="eggplant"
//                           initial={{ opacity: 0, x: -50 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 50 }}
//                           transition={{ duration: 0.6, type: "spring" }}
//                         >
//                           <div className="rounded-2xl p-4 md:p-8 border-none">
//                             <div className="flex flex-col items-center gap-4">
//                               <div className="text-center w-full">
//                                 <h3 className="text-xl md:text-3xl font-bold text-purple-500 mb-2 md:mb-4 font-mono">
//                                   EGGPLANT ANALYSIS PROTOCOL
//                                 </h3>
//                                 <p className="text-purple-600 dark:text-purple-200/80 mb-4 md:mb-6 text-sm md:text-lg">
//                                   Comprehensive pathogen screening for solanaceous crops with molecular precision:
//                                 </p>
//                               </div>

//                               <div className="flex flex-col lg:flex-row items-center w-full gap-4">
//                                 <div className="flex-1 w-full">
//                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full">
//                                     {["Aphids", "Leaf Wilt", "Powdery Mildew", "TMV"].map((disease, index) => (
//                                       <motion.div
//                                         key={disease}
//                                         initial={{ opacity: 0, scale: 0.8 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         transition={{ delay: index * 0.1 }}
//                                         className="w-full"
//                                       >
//                                         <Badge
//                                           variant="outline"
//                                           className="bg-purple-950/50 text-purple-300 border-purple-700/80 px-2 md:px-4 py-2 md:py-2 font-mono text-xs md:text-sm w-full justify-center min-h-[40px] flex items-center"
//                                         >
//                                           <Bug className="h-3 w-3 mr-1 md:mr-2 flex-shrink-0" />
//                                           <span className="text-center">{disease}</span>
//                                         </Badge>
//                                       </motion.div>
//                                     ))}
//                                   </div>
//                                 </div>

//                                 <div className="flex-shrink-0 mt-4 lg:mt-0">
//                                   <motion.div
//                                     className="w-20 h-20 md:w-32 md:h-32 rounded-full transparent-bg border-2 border-purple-500/50 flex items-center justify-center"
//                                     whileHover={{ scale: 1.1, rotate: -360 }}
//                                     transition={{ duration: 2 }}
//                                   >
//                                     <Image
//                                       src="/eggplant-image.png"
//                                       alt="Eggplant"
//                                       width={48}
//                                       height={48}
//                                       className="h-12 w-12 md:h-20 md:w-20 object-contain"
//                                     />
//                                   </motion.div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.8 }}
//             className="mb-8 md:mb-12"
//           >
//             <Card className="transparent-bg border border-primary/30 overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
//                   <Upload className="h-6 w-6 md:h-8 md:w-8 text-blue-500 animate-bounce" />
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-center md:text-left">
//                     HYPERSPECTRAL IMAGE ACQUISITION
//                   </span>
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground font-mono text-center md:text-left">
//                   Upload biological samples for neural network analysis • Supported formats: JPG, PNG, WEBP
//                 </CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <motion.div
//                   className={cn(
//                     "border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-500 cursor-pointer",
//                     isHovering
//                       ? "border-primary bg-primary/10 scale-105"
//                       : "border-muted-foreground/30 hover:border-primary/50",
//                     isScanning && "border-yellow-500 bg-yellow-500/10",
//                   )}
//                   onDrop={handleDrop}
//                   onDragOver={(e) => {
//                     e.preventDefault()
//                     setIsHovering(true)
//                   }}
//                   onDragLeave={() => setIsHovering(false)}
//                   onClick={() => fileInputRef.current?.click()}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <motion.div
//                     animate={{
//                       y: isHovering ? -10 : 0,
//                       scale: isHovering ? 1.1 : 1,
//                     }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <Upload
//                       className={cn(
//                         "h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 md:mb-6 transition-all duration-300",
//                         isHovering ? "text-primary" : "text-muted-foreground",
//                         isScanning && "text-yellow-500 animate-spin",
//                       )}
//                     />

//                     <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-foreground">
//                       {isScanning ? "ANALYZING BIO-SIGNATURE..." : "UPLOAD BIOLOGICAL SAMPLES"}
//                     </h3>
//                     <p className="text-muted-foreground font-mono text-sm md:text-lg">
//                       {isScanning
//                         ? "Initializing neural pathways..."
//                         : "Drop images here or click to select • Multi-sample batch processing enabled"}
//                     </p>

//                     {isHovering && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-4 text-primary font-mono"
//                       >
//                         [ BIO-SIGNATURE DETECTED • READY FOR UPLOAD ]
//                       </motion.div>
//                     )}
//                   </motion.div>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                   />
//                 </motion.div>

//                 {files.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="mt-6 md:mt-8"
//                   >
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
//                       <div className="flex flex-col md:flex-row items-center gap-4">
//                         <Badge
//                           variant="outline"
//                           className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-500/50 font-mono text-sm md:text-lg"
//                         >
//                           <Database className="h-4 w-4 mr-2" />
//                           {files.length} SAMPLES LOADED
//                         </Badge>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={clearFiles}
//                           className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-mono"
//                         >
//                           <X className="h-4 w-4 mr-2" /> PURGE DATA
//                         </Button>
//                       </div>

//                       <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Button
//                           onClick={predictDiseases}
//                           disabled={isProcessing}
//                           className={cn(
//                             "px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-mono",
//                             "bg-gradient-to-r from-green-600 via-blue-600 to-purple-600",
//                             "hover:from-green-500 hover:via-blue-500 hover:to-purple-500",
//                             "border border-primary/50 rounded-xl",
//                             isProcessing && "animate-pulse",
//                           )}
//                         >
//                           <span className="flex items-center gap-2 md:gap-3">
//                             {isProcessing ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
//                                 <span className="hidden md:inline">NEURAL PROCESSING...</span>
//                                 <span className="md:hidden">PROCESSING...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <Zap className="h-4 w-4 md:h-5 md:w-5" />
//                                 <span className="hidden md:inline">INITIATE DEEP SCAN</span>
//                                 <span className="md:hidden">SCAN</span>
//                               </>
//                             )}
//                           </span>
//                         </Button>
//                       </motion.div>
//                     </div>

//                     {isProcessing && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="mb-6 md:mb-8 p-4 md:p-6 transparent-bg rounded-xl border border-yellow-500/30"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-3">
//                             <Brain className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 animate-pulse" />
//                             <span className="text-yellow-500 font-mono text-sm md:text-lg">
//                               NEURAL NETWORK PROCESSING
//                             </span>
//                           </div>
//                           <span className="text-yellow-400 font-mono text-lg md:text-xl font-bold">
//                             {Math.round(processingProgress)}%
//                           </span>
//                         </div>
//                         <Progress
//                           value={processingProgress}
//                           className="h-2 md:h-3 bg-muted border border-yellow-500/30"
//                         />
//                         <div className="mt-3 text-muted-foreground font-mono text-xs md:text-sm">
//                           Genomic pattern analysis • Molecular pattern recognition • Neural pathway optimization
//                         </div>
//                       </motion.div>
//                     )}

//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
//                       {files.map((file, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: index * 0.1, duration: 0.5 }}
//                           whileHover={{ scale: 1.05 }}
//                         >
//                           <div className="group relative aspect-square rounded-xl overflow-hidden transparent-bg border border-primary/30 hover:border-primary/50 transition-all duration-300">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`Sample ${index + 1}`}
//                               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                             />

//                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-2 md:p-3">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="rounded-full bg-black/50 text-white hover:bg-primary/20 border border-primary/30"
//                                   >
//                                     <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-4xl p-0 overflow-hidden transparent-bg border border-primary/30">
//                                   <img
//                                     src={URL.createObjectURL(file) || "/placeholder.svg"}
//                                     alt={file.name}
//                                     className="w-full h-auto max-h-[80vh] object-contain"
//                                   />
//                                 </DialogContent>
//                               </Dialog>
//                             </div>

//                             <div className="absolute top-2 left-2 right-2">
//                               <div className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
//                                 {file.name.length > 12 ? `${file.name.substring(0, 9)}...` : file.name}
//                               </div>
//                             </div>

//                             {isScanning && (
//                               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent animate-pulse" />
//                             )}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>

//           {predictions.length > 0 && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="mb-8 md:mb-12"
//               >
//                 <Card className="transparent-bg border border-primary/30 overflow-hidden">
//                   <CardHeader>
//                     <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
//                       <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-cyan-500 animate-pulse" />
//                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-green-500 text-center md:text-left">
//                         BIOSYNTHETIC ANALYSIS DASHBOARD
//                       </span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
//                       {[
//                         {
//                           label: "TOTAL SAMPLES",
//                           value: stats.total,
//                           icon: Database,
//                           color: "text-blue-500",
//                           bgColor: "bg-blue-100 dark:bg-blue-900/30",
//                           borderColor: "border-blue-500/50",
//                         },
//                         {
//                           label: "SUCCESSFUL SCANS",
//                           value: stats.successful,
//                           icon: CheckCircle,
//                           color: "text-green-500",
//                           bgColor: "bg-green-100 dark:bg-green-900/30",
//                           borderColor: "border-green-500/50",
//                         },
//                         {
//                           label: "FAILED ANALYSIS",
//                           value: stats.failed,
//                           icon: AlertTriangle,
//                           color: "text-red-500",
//                           bgColor: "bg-red-100 dark:bg-red-900/30",
//                           borderColor: "border-red-500/50",
//                         },
//                         {
//                           label: "AVG PROCESS TIME",
//                           value: `${stats.avgTime.toFixed(2)}s`,
//                           icon: Clock,
//                           color: "text-purple-500",
//                           bgColor: "bg-purple-100 dark:bg-purple-900/30",
//                           borderColor: "border-purple-500/50",
//                         },
//                       ].map((stat, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           transition={{ delay: index * 0.1, duration: 0.5 }}
//                           whileHover={{ scale: 1.05, y: -5 }}
//                         >
//                           <div
//                             className={cn(
//                               "rounded-2xl p-4 md:p-6 text-center h-full flex flex-col items-center justify-center border",
//                               stat.bgColor,
//                               stat.borderColor,
//                               "transparent-bg",
//                             )}
//                           >
//                             <stat.icon className={cn("h-6 w-6 md:h-8 md:w-8 mb-2 md:mb-3 animate-pulse", stat.color)} />
//                             <div className={cn("text-2xl md:text-3xl font-bold mb-1 md:mb-2 font-mono", stat.color)}>
//                               {stat.value}
//                             </div>
//                             <div className="text-xs md:text-sm text-muted-foreground font-mono">{stat.label}</div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>

//                     {Object.keys(stats.classCounts).length > 0 && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5, duration: 0.8 }}
//                         className="pt-6 border-t border-border"
//                       >
//                         <h4 className="text-lg font-bold text-cyan-500 mb-4 md:mb-6 font-mono flex items-center gap-2">
//                           <Radar className="h-4 w-4 md:h-5 md:w-5" />
//                           PATHOGEN DISTRIBUTION MATRIX
//                         </h4>
//                         <div className="space-y-3 md:space-y-4">
//                           {Object.entries(stats.classCounts).map(([disease, count], index) => (
//                             <motion.div
//                               key={disease}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
//                               className="flex items-center gap-3 md:gap-4"
//                             >
//                               <div
//                                 className="w-1/3 text-xs md:text-sm font-mono text-muted-foreground truncate"
//                                 title={disease}
//                               >
//                                 {disease}
//                               </div>
//                               <div className="flex-1 relative">
//                                 <div className="h-2 md:h-3 rounded-full overflow-hidden bg-muted border border-border">
//                                   <motion.div
//                                     className={cn(
//                                       "h-full rounded-full",
//                                       disease.toLowerCase().includes("healthy") ||
//                                         disease.toLowerCase().includes("fresh")
//                                         ? "bg-gradient-to-r from-green-500 to-green-400"
//                                         : "bg-gradient-to-r from-amber-500 to-red-500",
//                                     )}
//                                     initial={{ width: "0%" }}
//                                     animate={{ width: `${(count / stats.total) * 100}%` }}
//                                     transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
//                                   />
//                                 </div>
//                               </div>
//                               <div className="w-8 md:w-12 text-right text-xs md:text-sm font-mono font-bold text-cyan-500">
//                                 {count}
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16">
//                 {predictions.map((prediction, index) => (
//                   <motion.div
//                     key={prediction.id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
//                     whileHover={{ y: -10, scale: 1.02 }}
//                   >
//                     <Card className="transparent-bg border border-primary/30 overflow-hidden h-full flex flex-col group">
//                       <div className="aspect-video relative overflow-hidden">
//                         <img
//                           src={prediction.imageUrl || "/placeholder.svg"}
//                           alt="Analysis Sample"
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />

//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-end p-3 md:p-4">
//                           <Dialog>
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full bg-black/50 text-white hover:bg-cyan-500/20 border border-cyan-500/30"
//                               >
//                                 <Maximize2 className="h-4 w-4" />
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="max-w-4xl p-0 overflow-hidden transparent-bg border border-cyan-500/30">
//                               <img
//                                 src={prediction.imageUrl || "/placeholder.svg"}
//                                 alt="Full Analysis"
//                                 className="w-full h-auto max-h-[80vh] object-contain"
//                               />
//                             </DialogContent>
//                           </Dialog>
//                         </div>

//                         {prediction.isProcessing && (
//                           <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
//                             <div className="text-center">
//                               <motion.div
//                                 animate={{ rotate: 360 }}
//                                 transition={{
//                                   duration: 1.5,
//                                   repeat: Number.POSITIVE_INFINITY,
//                                   ease: "linear",
//                                 }}
//                                 className="relative mx-auto mb-4 h-16 w-16"
//                               >
//                                 <div className="absolute inset-0 rounded-full border-2 border-solid border-cyan-400 border-b-transparent border-l-transparent" />
//                               </motion.div>
//                               <p className="text-cyan-400 font-mono text-sm">NEURAL ANALYSIS</p>
//                               <p className="text-muted-foreground font-mono text-xs">Core processing...</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       <CardContent className="p-4 md:p-6 flex-grow">
//                         {prediction.error ? (
//                           <div className="text-center h-full flex flex-col items-center justify-center py-6">
//                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
//                               <Badge variant="destructive" className="px-3 md:px-4 py-2 text-sm md:text-lg font-mono">
//                                 <AlertTriangle className="h-4 w-4 mr-2" />
//                                 ANALYSIS FAILED
//                               </Badge>
//                             </motion.div>
//                             <p className="text-red-500 font-mono text-xs md:text-sm text-center">{prediction.error}</p>
//                           </div>
//                         ) : prediction.predicted_class ? (
//                           <div className="space-y-4 md:space-y-6">
//                             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
//                               <Badge
//                                 variant="outline"
//                                 className={cn(
//                                   "px-3 md:px-4 py-2 text-xs md:text-sm font-mono border-2",
//                                   prediction.predicted_class.toLowerCase().includes("healthy") ||
//                                     prediction.predicted_class.toLowerCase().includes("fresh")
//                                     ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-500/50"
//                                     : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-500/50",
//                                 )}
//                               >
//                                 {prediction.predicted_class.toLowerCase().includes("healthy") ||
//                                   prediction.predicted_class.toLowerCase().includes("fresh") ? (
//                                   <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
//                                 ) : (
//                                   <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
//                                 )}
//                                 {prediction.predicted_class}
//                               </Badge>

//                               {prediction.inference_time_seconds && (
//                                 <TooltipProvider>
//                                   <Tooltip>
//                                     <TooltipTrigger asChild>
//                                       <div className="flex items-center text-xs font-mono text-muted-foreground">
//                                         <Clock className="h-3 w-3 mr-1" />
//                                         {prediction.inference_time_seconds.toFixed(3)}s
//                                       </div>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p className="text-cyan-400 font-mono">Neural Processing Time</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </TooltipProvider>
//                               )}
//                             </div>

//                             <div className="space-y-4">
//                               <div className="flex items-start gap-3">
//                                 <Droplets className="h-4 w-4 md:h-5 md:w-5 mt-1 text-blue-500 flex-shrink-0" />
//                                 <div>
//                                   <h4 className="font-bold text-blue-500 font-mono mb-2 text-sm md:text-base">
//                                     TREATMENT PROTOCOL:
//                                   </h4>
//                                   <div className="text-muted-foreground text-xs md:text-sm leading-relaxed">
//                                     <MarkdownRenderer
//                                       text={
//                                         treatments[prediction.predicted_class as keyof typeof treatments] ||
//                                         "🔬 UNKNOWN PATHOGEN: Consult the genomic agricultural database for advanced treatment protocols."
//                                       }
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ) : null}
//                       </CardContent>

//                       <CardFooter className="px-4 md:px-6 py-3 md:py-4 bg-muted/30 border-t border-border">
//                         <div className="flex items-center justify-between w-full">
//                           <div className="text-xs font-mono text-muted-foreground">
//                             SAMPLE #{String(index + 1).padStart(3, "0")}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                             <span className="text-xs font-mono text-green-500">ANALYZED</span>
//                           </div>
//                         </div>
//                       </CardFooter>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes gridMove {
//           0% { transform: translate(0, 0); }
//           100% { transform: translate(50px, 50px); }
//         }

//         @keyframes leafFloat {
//           0% { 
//             transform: translateY(100vh) translateX(0) rotate(0deg);
//             opacity: 0;
//           }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { 
//             transform: translateY(-100px) translateX(50px) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         @keyframes lightRise {
//           0% { 
//             transform: translateY(0) scale(0);
//             opacity: 0;
//           }
//           20% { 
//             opacity: 1;
//             transform: scale(1);
//           }
//           80% { opacity: 1; }
//           100% { 
//             transform: translateY(-300px) scale(0);
//             opacity: 0;
//           }
//         }

//        @keyframes rootGrow {
//   0% {
//     height: 0;
//     opacity: 0;
//   }
//   50% { opacity: 0.5; }
//   100% {
//     height: 100%;
//     opacity: 0;
//   }
// }

//         .leaf-particle {
//           animation: leafFloat linear infinite;
//         }

//         .light-particle {
//           animation: lightRise linear infinite;
//         }

//         .root-network {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 100%;
//           overflow: hidden;
//         }

//         .root {
//   position: absolute;
//   top: 0;
//   width: 2px;
//   background: linear-gradient(to bottom, rgba(139, 69, 19, 0.6), transparent);
//   animation: rootGrow 8s ease-out infinite;
//   transform-origin: top;
// }

//         .root-branch {
//           position: absolute;
//           bottom: 0;
//           width: 1px;
//           background: linear-gradient(to top, rgba(139, 69, 19, 0.4), transparent);
//           animation: rootGrow 6s ease-out infinite;
//           transform-origin: bottom;
//         }

//         .dna-helix {
//           position: relative;
//           width: 100px;
//           height: 100%;
//           margin: 0 auto;
//           animation: dnaRotate 20s linear infinite;
//         }

//         .dna-step {
//           position: absolute;
//           width: 100%;
//           height: 20px;
//           animation: dnaFloat 4s ease-in-out infinite;
//         }

//         .dna-base-pair {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .dna-base {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: rgba(34, 197, 94, 0.6);
//           box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
//         }

//         .dna-base-left {
//           animation: dnaBaseLeft 4s ease-in-out infinite;
//         }

//         .dna-base-right {
//           animation: dnaBaseRight 4s ease-in-out infinite;
//         }

//         @keyframes dnaRotate {
//           0% { transform: rotateY(0deg); }
//           100% { transform: rotateY(360deg); }
//         }

//         @keyframes dnaFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         @keyframes dnaBaseLeft {
//           0%, 100% { transform: translateX(0) scale(1); }
//           50% { transform: translateX(10px) scale(1.2); }
//         }

//         @keyframes dnaBaseRight {
//           0%, 100% { transform: translateX(0) scale(1); }
//           50% { transform: translateX(-10px) scale(1.2); }
//         }
//       `}</style>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import {
  Upload,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Droplets,
  Sun,
  Moon,
  Sparkles,
  X,
  Maximize2,
  Loader2,
  Dna,
  Cpu,
  Brain,
  Microscope,
  Wifi,
  Database,
  Shield,
  Radar,
  Bug,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PredictionResult {
  id: string
  file: File
  imageUrl: string
  predicted_class?: string
  inference_time_seconds?: number
  error?: string
  isProcessing: boolean
}

interface PredictionStats {
  total: number
  successful: number
  failed: number
  avgTime: number
  classCounts: Record<string, number>
}

interface LeafParticle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  delay: number
}

interface LightParticle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  delay: number
}

const API_BASE_URL = "https://ff99-34-106-88-244.ngrok-free.app"

const coconutTreatments = {
  "Bud Root Dropping":
    "🩺 **Problem:** Caused by poor soil drainage and fungal infection.\n✅ **Action:** Improve drainage around the palm's base and avoid overwatering.\n🛡️ **Treatment:** Apply a fungicide like Hexaconazole as a soil drench, following product guidelines.",
  "Bud Rot":
    "🩺 **Problem:** A fast-spreading fungal infection in the palm's crown.\n✅ **Action:** Immediately cut away and destroy all infected buds and surrounding leaves.\n🛡️ **Treatment:** Apply a copper-based fungicide, such as Bordeaux mixture, to the crown of the affected palm and any nearby healthy palms.",
  "Gray Leaf Spot":
    "🩺 **Problem:** A fungal disease often linked to nutrient deficiencies.\n✅ **Action:** Ensure the palm is well-fertilized, especially with potassium.\n🛡️ **Treatment:** For severe cases, apply a fungicide containing Mancozeb.",
  "Leaf Rot":
    "🩺 **Problem:** Fungal infection affecting the leaves.\n✅ **Action:** Prune and destroy all affected leaves immediately.\n🛡️ **Prevention:** Improve air circulation by clearing away dense undergrowth. In recurring cases, a fungicide like Propiconazole can be effective.",
  "Stem Bleeding":
    "🩺 **Problem:** A fungal infection causing a reddish-brown liquid to ooze from the trunk.\n✅ **Action:** Carefully scrape away the infected bark area until you see healthy tissue.\n🛡️ **Treatment:** Apply Bordeaux paste or a copper-based fungicide directly to the cleaned wound to prevent further infection.",
  Healthy:
    "✅ **Excellent Condition:** Your palm is healthy. Continue your current watering, fertilization, and maintenance schedule to keep it that way.",
}

const eggplantTreatments = {
  Aphids:
    "🩺 **Problem:** Small insects feeding on plant sap, often found under leaves.\n✅ **Action:** Spray the aphids off the leaves with a strong jet of water.\n🛡️ **Treatment:** For persistent infestations, apply Neem oil or insecticidal soap. Encourage beneficial insects like ladybugs.",
  "Cercospora Leaf Spot":
    "🩺 **Problem:** A fungal disease causing spots on the leaves.\n✅ **Action:** Remove and destroy heavily infected leaves.\n🛡️ **Prevention:** Improve air circulation by properly spacing plants and pruning lower leaves. A fungicide with Chlorothalonil can be used for widespread infection.",
  "Defect Eggplant":
    "🩺 **Problem:** Likely a calcium deficiency, also known as blossom-end rot.\n✅ **Action:** Ensure consistent watering to help with calcium uptake.\n🛡️ **Treatment:** Apply a calcium-rich foliar spray or amend the soil with a calcium supplement.",
  "Flea Beetles":
    "🩺 **Problem:** Small, dark beetles that chew numerous small holes in leaves.\n✅ **Action:** Apply Spinosad (an organic insecticide) or dust plants with diatomaceous earth.\n🛡️ **Prevention:** Use row covers on young plants to create a physical barrier.",
  "Fresh Eggplant":
    "✅ **Excellent Condition:** Your plant is healthy and thriving. Keep up the great work with your current care routine!",
  "Fresh Eggplant Leaf":
    "✅ **Excellent Condition:** Your plant is healthy and thriving. Keep up the great work with your current care routine!",
  "Leaf Wilt":
    "‼️ **CRITICAL ALERT: Verticillium or Fusarium Wilt Detected.** This soil-borne disease is incurable.\n❌ **Action:** Immediately remove and destroy the entire plant (do not compost). To prevent future issues, avoid planting eggplants, tomatoes, or peppers in this same spot for several years (crop rotation).",
  "Phytophthora Blight":
    "⚠️ **Warning: Advanced Blight Detected.** A serious water mold that rots the plant.\n✅ **Action:** Improve soil drainage immediately and avoid overhead watering.\n🛡️ **Treatment:** A fungicide with copper or phosphorous acid may help slow the spread on less affected plants.",
  "Powdery Mildew":
    "🩺 **Problem:** A white, powdery fungus on leaves and stems.\n✅ **Action:** Increase air circulation between plants and avoid getting leaves wet in the evening.\n🛡️ **Treatment:** Spray with Neem oil, potassium bicarbonate, or a specific fungicide for powdery mildew.",
  "Tobacco Mosaic Virus":
    "🦠 **CRITICAL ALERT: Virus Detected.** This disease has no cure and is highly contagious.\n❌ **Action:** Carefully remove and destroy the infected plant immediately. Wash your hands and disinfect any tools that touched the plant to avoid spreading it.",
}

const riceTreatments = {
  "Rice Tungro":
    "🦠 **Problem:** A viral disease causing yellowed, stunted leaves, transmitted by green leafhoppers.\n✅ **Action:** Control the leafhopper vector population using appropriate insecticides.\n🛡️ **Prevention:** Plant tungro-resistant rice varieties and manage weeds which can host the virus.",
  "Rice Stripes":
    "🩺 **Problem:** Stripe patterns on leaves, often indicating a nutrient deficiency (like zinc or magnesium) or environmental stress.\n✅ **Action:** Perform a soil analysis to identify nutrient imbalances.\n🛡️ **Treatment:** Apply foliar sprays containing the deficient micronutrients. Ensure proper water management to reduce stress.",
  "Rice Leaffolder":
    "🐛 **Problem:** Caterpillars of the Leaffolder moth (*Cnaphalocrocis medinalis*) fold leaves and scrape the green tissue, causing white, transparent streaks.\n✅ **Action:** Encourage natural predators. For severe infestations, apply a targeted insecticide.\n🛡️ **Prevention:** Avoid excessive use of nitrogen fertilizer.",
  Healthy:
    "✅ **Excellent Condition:** The rice plant is healthy and disease-free. Continue with your current care and management schedule.",
  "Rice Blast":
    "🍄 **Problem:** A major fungal disease (*Pyricularia oryzae*) causing diamond-shaped lesions with grayish centers and brown borders on leaves.\n✅ **Action:** Manage water levels carefully and avoid excessive nitrogen fertilizer.\n🛡️ **Treatment:** Apply a fungicide like Tricyclazole or a strobilurin-based product.",
  "Insect":
    "🐞 **Problem:** General damage from various insect pests (e.g., stem borers, planthoppers) other than Leaffolder.\n✅ **Action:** Identify the specific insect causing the damage for effective control.\n🛡️ **Treatment:** Implement Integrated Pest Management (IPM) strategies, including biological controls or targeted insecticides.",
  "Leaf Scald":
    "🍄 **Problem:** A fungal disease (*Rhynchosporium oryzae*) that causes zonate, scald-like lesions on leaves, often starting from the tip or margin.\n✅ **Action:** Maintain proper plant spacing for better air circulation and avoid excessive nitrogen fertilizer.\n🛡️ **Treatment:** Apply protective fungicides like Propiconazole if the disease is severe, especially during the later growth stages."
}

export default function PlantDiseaseDetector() {
  const { theme, setTheme } = useTheme()
  const [selectedPlant, setSelectedPlant] = useState<"coconut" | "eggplant" | "rice">("coconut")
  const [files, setFiles] = useState<File[]>([])
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [leafParticles, setLeafParticles] = useState<LeafParticle[]>([])
  const [lightParticles, setLightParticles] = useState<LightParticle[]>([])
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting and window size
  useEffect(() => {
    setMounted(true)

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== "undefined") {
      updateWindowSize()
      window.addEventListener("resize", updateWindowSize)
      return () => window.removeEventListener("resize", updateWindowSize)
    }
  }, [])

  // Initialize background animations
  useEffect(() => {
    if (!mounted || windowSize.width === 0) return

    const leaves = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: -100,
      size: Math.random() * 15 + 10,
      rotation: Math.random() * 360,
      speed: Math.random() * 1 + 0.5,
      delay: Math.random() * 10,
    }));

    const lights = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: windowSize.height - Math.random() * 300,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1 + 0.5,
      delay: Math.random() * 5,
    }))

    setLeafParticles(leaves)
    setLightParticles(lights)
  }, [mounted, windowSize])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles(imageFiles)
    setPredictions([])
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 2000)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const imageFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles(imageFiles)
    setPredictions([])
    setIsHovering(false)
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 2000)
  }

  const predictDiseases = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Construct the full URL dynamically based on the selected plant
    const fullApiUrl = `${API_BASE_URL}/predict-${selectedPlant}`;

    const initialPredictions: PredictionResult[] = files.map((file, index) => ({
      id: `${index}-${file.name}`,
      file,
      imageUrl: URL.createObjectURL(file),
      isProcessing: true,
    }))

    setPredictions(initialPredictions)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch(fullApiUrl, { // Use the dynamically created URL
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        setPredictions((prev) =>
          prev.map((pred) =>
            pred.id === `${i}-${file.name}`
              ? {
                ...pred,
                predicted_class: response.ok ? data.predicted_class : undefined,
                inference_time_seconds: response.ok ? data.inference_time_seconds : undefined,
                error: response.ok ? undefined : data.error || "Prediction failed",
                isProcessing: false,
              }
              : pred,
          ),
        )
      } catch (error) {
        setPredictions((prev) =>
          prev.map((pred) =>
            pred.id === `${i}-${file.name}`
              ? {
                ...pred,
                error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
                isProcessing: false,
              }
              : pred,
          ),
        )
      }

      setProcessingProgress(((i + 1) / files.length) * 100)
    }

    setIsProcessing(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const getStats = (): PredictionStats => {
    const successful = predictions.filter((p) => p.predicted_class && !p.error).length
    const failed = predictions.filter((p) => p.error).length
    const avgTime =
      predictions.filter((p) => p.inference_time_seconds).reduce((sum, p) => sum + (p.inference_time_seconds || 0), 0) /
      successful || 0

    const classCounts: Record<string, number> = {}
    predictions.forEach((p) => {
      if (p.predicted_class) {
        classCounts[p.predicted_class] = (classCounts[p.predicted_class] || 0) + 1
      }
    })

    return {
      total: predictions.length,
      successful,
      failed,
      avgTime,
      classCounts,
    }
  }

  const stats = getStats()
  const treatments =
    selectedPlant === "coconut"
      ? coconutTreatments
      : selectedPlant === "eggplant"
        ? eggplantTreatments
        : riceTreatments

  const clearFiles = () => {
    setFiles([])
    setPredictions([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary font-mono text-xl">INITIALIZING CORE SYSTEMS...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Plant-themed Background Effects */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            backgroundPosition: "0 0",
            animation: "gridMove 20s linear infinite",
          }}
        />
        {leafParticles.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-particle absolute pointer-events-none"
            style={{
              left: `${leaf.x}px`,
              top: `${leaf.y}px`,
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${20 / leaf.speed}s`,
            }}
          >
            <Leaf
              className="text-green-500 w-full h-full opacity-20"
              style={{
                transform: `rotate(${leaf.rotation}deg)`,
                filter: "drop-shadow(0 0 5px rgba(34, 197, 94, 0.5))",
              }}
            />
          </div>
        ))}

        {lightParticles.map((particle) => (
          <div
            key={particle.id}
            className="light-particle absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}px`,
              bottom: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: "rgba(250, 204, 21, 0.7)",
              boxShadow: "0 0 10px rgba(250, 204, 21, 0.8)",
              animationDelay: `${particle.delay}s`,
              animationDuration: `${8 / particle.speed}s`,
            }}
          />
        ))}

        <div className="absolute inset-0 overflow-hidden">
          <div className="root-network">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="root"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`,
                  height: `${Math.random() * 30 + 40}%`,
                }}
              >
                <div className="root-branch" style={{ left: "30%", height: "40%", animationDelay: "0.3s" }}>
                  <div className="root-branch" style={{ left: "50%", height: "50%", animationDelay: "0.6s" }}></div>
                </div>
                <div className="root-branch" style={{ left: "70%", height: "60%", animationDelay: "0.9s" }}>
                  <div className="root-branch" style={{ left: "40%", height: "40%", animationDelay: "1.2s" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full transparent-bg border-primary/20 hover:border-primary/40"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-600" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative"
              >
                <div className="absolute -inset-20 flex items-center justify-center">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      initial={{
                        opacity: 1,
                        scale: 0,
                        x: 0,
                        y: 0,
                        backgroundColor: ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"][
                          Math.floor(Math.random() * 5)
                        ],
                      }}
                      animate={{
                        opacity: 0,
                        scale: Math.random() * 2 + 1,
                        x: (Math.random() - 0.5) * 300,
                        y: (Math.random() - 0.5) * 300,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        ease: "easeOut",
                        delay: Math.random() * 0.5,
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 2 }}
                  className="text-4xl font-bold text-primary"
                >
                  <Sparkles className="h-16 w-16" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center mb-8 md:mb-16 relative"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <motion.div
                className="relative p-4 md:p-6 rounded-full transparent-bg border border-primary/30"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Leaf className="h-12 w-12 md:h-16 md:w-16 text-primary" />
              </motion.div>

              <div className="text-center">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-2 md:mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  NEURAL PLANT
                </motion.h1>
                <motion.h2
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  DISEASE DETECTOR
                </motion.h2>
                <motion.div
                  className="text-primary font-mono text-sm md:text-lg tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  [NEURAL ENHANCED • BIOTECH READY ]
                </motion.div>
              </div>
            </div>

            <motion.p
              className="text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground leading-relaxed font-light px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Revolutionary bio-synthetic neural networks for
              <span className="text-green-500 font-semibold"> high-precision, real-time </span>
              plant pathogen detection and
              <span className="text-blue-500 font-semibold"> molecular-level analysis</span>
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {[
                { icon: Brain, label: "AI CORE", status: "ONLINE", color: "text-green-500" },
                { icon: Cpu, label: "DEEP CORE", status: "ACTIVE", color: "text-blue-500" },
                { icon: Shield, label: "SECURITY", status: "SECURE", color: "text-purple-500" },
                { icon: Wifi, label: "NEURAL LINK", status: "CONNECTED", color: "text-yellow-500" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className={cn("h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 animate-pulse", item.color)} />
                  <div className="text-xs font-mono text-muted-foreground">{item.label}</div>
                  <div className={cn("text-xs font-bold", item.color)}>{item.status}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <Alert className="transparent-bg border-amber-500/50 text-amber-600 dark:text-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-500 animate-pulse" />
              <AlertDescription className="font-mono text-sm md:text-base">
                <strong className="text-amber-500">[CRITICAL NOTICE]</strong> This system provides advanced AI analysis
                for research purposes. Always consult certified agricultural experts for final diagnosis and treatment
                protocols.
                <span className="text-amber-500 ml-2 block md:inline">• CLASSIFICATION LEVEL: EXPERIMENTAL •</span>
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <Card className="transparent-bg border border-primary/30 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
                  <Dna className="h-6 w-6 md:h-8 md:w-8 text-primary animate-spin" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500 text-center md:text-left">
                    BIOLOGICAL TARGET SELECTION
                  </span>
                </CardTitle>
                <CardDescription className="text-muted-foreground font-mono text-center md:text-left">
                  Initialize hyperspectral scanning protocols for target organism classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={selectedPlant}
                  onValueChange={(value) => setSelectedPlant(value as "coconut" | "eggplant" | "rice")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 transparent-bg border border-primary/30">
                    <TabsTrigger
                      value="coconut"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white font-mono text-xs md:text-sm"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <Image
                          src="/coconut-tree.png"
                          alt="Coconut Tree"
                          width={20}
                          height={20}
                          className="h-4 w-4 md:h-6 md:w-6 object-contain"
                        />
                        <span className="hidden md:inline">COCOS NUCIFERA</span>
                        <span className="md:hidden">COCONUT</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="eggplant"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-mono text-xs md:text-sm"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <Image
                          src="/eggplant-image.png"
                          alt="Eggplant"
                          width={20}
                          height={20}
                          className="h-4 w-4 md:h-6 md:w-6 object-contain"
                        />
                        <span className="hidden md:inline">SOLANUM MELONGENA</span>
                        <span className="md:hidden">EGGPLANT</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="rice"
                      className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white font-mono text-xs md:text-sm"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <Image
                          src="/rice-plant.png"
                          alt="Rice Plant"
                          width={20}
                          height={20}
                          className="h-4 w-4 md:h-6 md:w-6 object-contain"
                        />
                        <span className="hidden md:inline">ORYZA SATIVA</span>
                        <span className="md:hidden">RICE</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <div className="relative overflow-hidden rounded-2xl">
                    <AnimatePresence mode="wait">
                      {selectedPlant === "coconut" ? (
                        <motion.div
                          key="coconut"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.6, type: "spring" }}
                        >
                          <div className="rounded-2xl p-4 md:p-8 border-none">
                            <div className="flex flex-col items-center gap-4">
                              <div className="text-center w-full">
                                <h3 className="text-xl md:text-3xl font-bold text-green-500 mb-2 md:mb-4 font-mono">
                                  COCONUT ANALYSIS PROTOCOL
                                </h3>
                                <p className="text-green-600 dark:text-green-200/80 mb-4 md:mb-6 text-sm md:text-lg">
                                  Advanced disease identification for tropical palm species with neural-synthesis imaging:
                                </p>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center w-full gap-4">
                                <div className="flex-1 w-full">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full">
                                    {["Bud Rot", "Gray Leaf Spot", "Stem Bleeding", "+2 other"].map(
                                      (disease, index) => (
                                        <motion.div
                                          key={disease}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="w-full"
                                        >
                                          <Badge
                                            variant="outline"
                                            className="bg-emerald-950/50 text-emerald-300 border-emerald-700/80 px-2 md:px-4 py-2 md:py-2 font-mono text-xs md:text-sm w-full justify-center min-h-[40px] flex items-center"
                                          >
                                            <Microscope className="h-3 w-3 mr-1 md:mr-2 flex-shrink-0" />
                                            <span className="text-center">{disease}</span>
                                          </Badge>
                                        </motion.div>
                                      ),
                                    )}
                                  </div>
                                </div>

                                <div className="flex-shrink-0 mt-4 lg:mt-0">
                                  <motion.div
                                    className="w-20 h-20 md:w-32 md:h-32 rounded-full transparent-bg border-2 border-green-500/50 flex items-center justify-center"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 2 }}
                                  >
                                    <Image
                                      src="/coconut-tree.png"
                                      alt="Coconut Tree"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 md:h-20 md:w-20 object-contain"
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : selectedPlant === "eggplant" ? (
                        <motion.div
                          key="eggplant"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.6, type: "spring" }}
                        >
                          <div className="rounded-2xl p-4 md:p-8 border-none">
                            <div className="flex flex-col items-center gap-4">
                              <div className="text-center w-full">
                                <h3 className="text-xl md:text-3xl font-bold text-purple-500 mb-2 md:mb-4 font-mono">
                                  EGGPLANT ANALYSIS PROTOCOL
                                </h3>
                                <p className="text-purple-600 dark:text-purple-200/80 mb-4 md:mb-6 text-sm md:text-lg">
                                  Comprehensive disease screening for solanaceous crops with high-precision pattern recognition:
                                </p>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center w-full gap-4">
                                <div className="flex-1 w-full">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full">
                                    {["Aphids", "Leaf Wilt", "Powdery Mildew", "+7 other"].map((disease, index) => (
                                      <motion.div
                                        key={disease}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-full"
                                      >
                                        <Badge
                                          variant="outline"
                                          className="bg-purple-950/50 text-purple-300 border-purple-700/80 px-2 md:px-4 py-2 md:py-2 font-mono text-xs md:text-sm w-full justify-center min-h-[40px] flex items-center"
                                        >
                                          <Bug className="h-3 w-3 mr-1 md:mr-2 flex-shrink-0" />
                                          <span className="text-center">{disease}</span>
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex-shrink-0 mt-4 lg:mt-0">
                                  <motion.div
                                    className="w-20 h-20 md:w-32 md:h-32 rounded-full transparent-bg border-2 border-purple-500/50 flex items-center justify-center"
                                    whileHover={{ scale: 1.1, rotate: -360 }}
                                    transition={{ duration: 2 }}
                                  >
                                    <Image
                                      src="/eggplant-image.png"
                                      alt="Eggplant"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 md:h-20 md:w-20 object-contain"
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="rice"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.6, type: "spring" }}
                        >
                          <div className="rounded-2xl p-4 md:p-8 border-none">
                            <div className="flex flex-col items-center gap-4">
                              <div className="text-center w-full">
                                <h3 className="text-xl md:text-3xl font-bold text-yellow-500 mb-2 md:mb-4 font-mono">
                                  RICE ANALYSIS PROTOCOL
                                </h3>
                                <p className="text-yellow-600 dark:text-yellow-200/80 mb-4 md:mb-6 text-sm md:text-lg">
                                  Targeted visual identification of common rice diseases and pests:
                                </p>
                              </div>
                              <div className="flex flex-col lg:flex-row items-center w-full gap-4">
                                <div className="flex-1 w-full">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 w-full">
                                    {["Tungro", "Rice Blast", "Leaffolder", "+3 other"].map((disease, index) => (
                                      <motion.div
                                        key={disease}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-full"
                                      >
                                        <Badge
                                          variant="outline"
                                          className="bg-yellow-950/50 text-yellow-300 border-yellow-700/80 px-2 md:px-4 py-2 md:py-2 font-mono text-xs md:text-sm w-full justify-center min-h-[40px] flex items-center"
                                        >
                                          <Bug className="h-3 w-3 mr-1 md:mr-2 flex-shrink-0" />
                                          <span className="text-center">{disease}</span>
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex-shrink-0 mt-4 lg:mt-0">
                                  <motion.div
                                    className="w-20 h-20 md:w-32 md:h-32 rounded-full transparent-bg border-2 border-yellow-500/50 flex items-center justify-center"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 2 }}
                                  >
                                    <Image
                                      src="/rice-plant.png"
                                      alt="Rice Plant"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 md:h-20 md:w-20 object-contain"
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <Card className="transparent-bg border border-primary/30 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
                  <Upload className="h-6 w-6 md:h-8 md:w-8 text-blue-500 animate-bounce" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-center md:text-left">
                    HYPERSPECTRAL IMAGE ACQUISITION
                  </span>
                </CardTitle>
                <CardDescription className="text-muted-foreground font-mono text-center md:text-left">
                  Upload biological samples for neural network analysis • Supported formats: JPG, PNG, WEBP
                </CardDescription>
              </CardHeader>

              <CardContent>
                <motion.div
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-500 cursor-pointer",
                    isHovering
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-muted-foreground/30 hover:border-primary/50",
                    isScanning && "border-yellow-500 bg-yellow-500/10",
                  )}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsHovering(true)
                  }}
                  onDragLeave={() => setIsHovering(false)}
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{
                      y: isHovering ? -10 : 0,
                      scale: isHovering ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Upload
                      className={cn(
                        "h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 md:mb-6 transition-all duration-300",
                        isHovering ? "text-primary" : "text-muted-foreground",
                        isScanning && "text-yellow-500 animate-spin",
                      )}
                    />

                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-foreground">
                      {isScanning ? "ANALYZING BIO-SIGNATURE..." : "UPLOAD BIOLOGICAL SAMPLES"}
                    </h3>
                    <p className="text-muted-foreground font-mono text-sm md:text-lg">
                      {isScanning
                        ? "Initializing neural pathways..."
                        : "Drop images here or click to select • Multi-sample batch processing enabled"}
                    </p>

                    {isHovering && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-primary font-mono"
                      >
                        [ BIO-SIGNATURE DETECTED • READY FOR UPLOAD ]
                      </motion.div>
                    )}
                  </motion.div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </motion.div>

                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 md:mt-8"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <Badge
                          variant="outline"
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-500/50 font-mono text-sm md:text-lg"
                        >
                          <Database className="h-4 w-4 mr-2" />
                          {files.length} SAMPLES LOADED
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFiles}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-mono"
                        >
                          <X className="h-4 w-4 mr-2" /> PURGE DATA
                        </Button>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={predictDiseases}
                          disabled={isProcessing}
                          className={cn(
                            "px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-mono",
                            "bg-gradient-to-r from-green-600 via-blue-600 to-purple-600",
                            "hover:from-green-500 hover:via-blue-500 hover:to-purple-500",
                            "border border-primary/50 rounded-xl",
                            isProcessing && "animate-pulse",
                          )}
                        >
                          <span className="flex items-center gap-2 md:gap-3">
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                                <span className="hidden md:inline">NEURAL PROCESSING...</span>
                                <span className="md:hidden">PROCESSING...</span>
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4 md:h-5 md:w-5" />
                                <span className="hidden md:inline">INITIATE DEEP SCAN</span>
                                <span className="md:hidden">SCAN</span>
                              </>
                            )}
                          </span>
                        </Button>
                      </motion.div>
                    </div>

                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 md:mb-8 p-4 md:p-6 transparent-bg rounded-xl border border-yellow-500/30"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Brain className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 animate-pulse" />
                            <span className="text-yellow-500 font-mono text-sm md:text-lg">
                              NEURAL NETWORK PROCESSING
                            </span>
                          </div>
                          <span className="text-yellow-400 font-mono text-lg md:text-xl font-bold">
                            {Math.round(processingProgress)}%
                          </span>
                        </div>
                        <Progress
                          value={processingProgress}
                          className="h-2 md:h-3 bg-muted border border-yellow-500/30"
                        />
                        <div className="mt-3 text-muted-foreground font-mono text-xs md:text-sm">
                          Genomic pattern analysis • Molecular pattern recognition • Neural pathway optimization
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="group relative aspect-square rounded-xl overflow-hidden transparent-bg border border-primary/30 hover:border-primary/50 transition-all duration-300">
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`Sample ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-2 md:p-3">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full bg-black/50 text-white hover:bg-primary/20 border border-primary/30"
                                  >
                                    <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 overflow-hidden transparent-bg border border-primary/30">
                                  <img
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={file.name}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                  />
                                </DialogContent>
                              </Dialog>
                            </div>

                            <div className="absolute top-2 left-2 right-2">
                              <div className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                {file.name.length > 12 ? `${file.name.substring(0, 9)}...` : file.name}
                              </div>
                            </div>

                            {isScanning && (
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent animate-pulse" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {predictions.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 md:mb-12"
              >
                <Card className="transparent-bg border border-primary/30 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex flex-col md:flex-row items-center gap-3 text-xl md:text-2xl">
                      <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-cyan-500 animate-pulse" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-green-500 text-center md:text-left">
                        BIOSYNTHETIC ANALYSIS DASHBOARD
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                      {[
                        {
                          label: "TOTAL SAMPLES",
                          value: stats.total,
                          icon: Database,
                          color: "text-blue-500",
                          bgColor: "bg-blue-100 dark:bg-blue-900/30",
                          borderColor: "border-blue-500/50",
                        },
                        {
                          label: "SUCCESSFUL SCANS",
                          value: stats.successful,
                          icon: CheckCircle,
                          color: "text-green-500",
                          bgColor: "bg-green-100 dark:bg-green-900/30",
                          borderColor: "border-green-500/50",
                        },
                        {
                          label: "FAILED ANALYSIS",
                          value: stats.failed,
                          icon: AlertTriangle,
                          color: "text-red-500",
                          bgColor: "bg-red-100 dark:bg-red-900/30",
                          borderColor: "border-red-500/50",
                        },
                        {
                          label: "AVG PROCESS TIME",
                          value: `${stats.avgTime.toFixed(2)}s`,
                          icon: Clock,
                          color: "text-purple-500",
                          bgColor: "bg-purple-100 dark:bg-purple-900/30",
                          borderColor: "border-purple-500/50",
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <div
                            className={cn(
                              "rounded-2xl p-4 md:p-6 text-center h-full flex flex-col items-center justify-center border",
                              stat.bgColor,
                              stat.borderColor,
                              "transparent-bg",
                            )}
                          >
                            <stat.icon className={cn("h-6 w-6 md:h-8 md:w-8 mb-2 md:mb-3 animate-pulse", stat.color)} />
                            <div className={cn("text-2xl md:text-3xl font-bold mb-1 md:mb-2 font-mono", stat.color)}>
                              {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground font-mono">{stat.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {Object.keys(stats.classCounts).length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="pt-6 border-t border-border"
                      >
                        <h4 className="text-lg font-bold text-cyan-500 mb-4 md:mb-6 font-mono flex items-center gap-2">
                          <Radar className="h-4 w-4 md:h-5 md:w-5" />
                          PATHOGEN DISTRIBUTION MATRIX
                        </h4>
                        <div className="space-y-3 md:space-y-4">
                          {Object.entries(stats.classCounts).map(([disease, count], index) => (
                            <motion.div
                              key={disease}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                              className="flex items-center gap-3 md:gap-4"
                            >
                              <div
                                className="w-1/3 text-xs md:text-sm font-mono text-muted-foreground truncate"
                                title={disease}
                              >
                                {disease}
                              </div>
                              <div className="flex-1 relative">
                                <div className="h-2 md:h-3 rounded-full overflow-hidden bg-muted border border-border">
                                  <motion.div
                                    className={cn(
                                      "h-full rounded-full",
                                      disease.toLowerCase().includes("healthy") ||
                                        disease.toLowerCase().includes("fresh")
                                        ? "bg-gradient-to-r from-green-500 to-green-400"
                                        : "bg-gradient-to-r from-amber-500 to-red-500",
                                    )}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(count / stats.total) * 100}%` }}
                                    transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                                  />
                                </div>
                              </div>
                              <div className="w-8 md:w-12 text-right text-xs md:text-sm font-mono font-bold text-cyan-500">
                                {count}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <Card className="transparent-bg border border-primary/30 overflow-hidden h-full flex flex-col group">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={prediction.imageUrl || "/placeholder.svg"}
                          alt="Analysis Sample"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-end p-3 md:p-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-black/50 text-white hover:bg-cyan-500/20 border border-cyan-500/30"
                              >
                                <Maximize2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden transparent-bg border border-cyan-500/30">
                              <img
                                src={prediction.imageUrl || "/placeholder.svg"}
                                alt="Full Analysis"
                                className="w-full h-auto max-h-[80vh] object-contain"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>

                        {prediction.isProcessing && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                                className="relative mx-auto mb-4 h-16 w-16"
                              >
                                <div className="absolute inset-0 rounded-full border-2 border-solid border-cyan-400 border-b-transparent border-l-transparent" />
                              </motion.div>
                              <p className="text-cyan-400 font-mono text-sm">NEURAL ANALYSIS</p>
                              <p className="text-muted-foreground font-mono text-xs">Core processing...</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4 md:p-6 flex-grow">
                        {prediction.error ? (
                          <div className="text-center h-full flex flex-col items-center justify-center py-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
                              <Badge variant="destructive" className="px-3 md:px-4 py-2 text-sm md:text-lg font-mono">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                ANALYSIS FAILED
                              </Badge>
                            </motion.div>
                            <p className="text-red-500 font-mono text-xs md:text-sm text-center">{prediction.error}</p>
                          </div>
                        ) : prediction.predicted_class ? (
                          <div className="space-y-4 md:space-y-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "px-3 md:px-4 py-2 text-xs md:text-sm font-mono border-2",
                                  prediction.predicted_class.toLowerCase().includes("healthy") ||
                                    prediction.predicted_class.toLowerCase().includes("fresh")
                                    ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-500/50"
                                    : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-500/50",
                                )}
                              >
                                {prediction.predicted_class.toLowerCase().includes("healthy") ||
                                  prediction.predicted_class.toLowerCase().includes("fresh") ? (
                                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                )}
                                {prediction.predicted_class}
                              </Badge>

                              {prediction.inference_time_seconds && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center text-xs font-mono text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {prediction.inference_time_seconds.toFixed(3)}s
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-cyan-400 font-mono">Neural Processing Time</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Droplets className="h-4 w-4 md:h-5 md:w-5 mt-1 text-blue-500 flex-shrink-0" />
                                <div>
                                  <h4 className="font-bold text-blue-500 font-mono mb-2 text-sm md:text-base">
                                    TREATMENT PROTOCOL:
                                  </h4>
                                  <div className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                                    <MarkdownRenderer
                                      text={
                                        treatments[prediction.predicted_class as keyof typeof treatments] ||
                                        "🔬 UNKNOWN PATHOGEN: Consult the genomic agricultural database for advanced treatment protocols."
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </CardContent>

                      <CardFooter className="px-4 md:px-6 py-3 md:py-4 bg-muted/30 border-t border-border">
                        <div className="flex items-center justify-between w-full">
                          <div className="text-xs font-mono text-muted-foreground">
                            SAMPLE #{String(index + 1).padStart(3, "0")}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-green-500">ANALYZED</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes leafFloat {
          0% { 
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes lightRise {
          0% { 
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% { 
            opacity: 1;
            transform: scale(1);
          }
          80% { opacity: 1; }
          100% { 
            transform: translateY(-300px) scale(0);
            opacity: 0;
          }
        }

       @keyframes rootGrow {
  0% {
    height: 0;
    opacity: 0;
  }
  50% { opacity: 0.5; }
  100% {
    height: 100%;
    opacity: 0;
  }
}

        .leaf-particle {
          animation: leafFloat linear infinite;
        }

        .light-particle {
          animation: lightRise linear infinite;
        }

        .root-network {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: hidden;
        }

        .root {
  position: absolute;
  top: 0;
  width: 2px;
  background: linear-gradient(to bottom, rgba(139, 69, 19, 0.6), transparent);
  animation: rootGrow 8s ease-out infinite;
  transform-origin: top;
}

        .root-branch {
          position: absolute;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to top, rgba(139, 69, 19, 0.4), transparent);
          animation: rootGrow 6s ease-out infinite;
          transform-origin: bottom;
        }

        .dna-helix {
          position: relative;
          width: 100px;
          height: 100%;
          margin: 0 auto;
          animation: dnaRotate 20s linear infinite;
        }

        .dna-step {
          position: absolute;
          width: 100%;
          height: 20px;
          animation: dnaFloat 4s ease-in-out infinite;
        }

        .dna-base-pair {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dna-base {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.6);
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
        }

        .dna-base-left {
          animation: dnaBaseLeft 4s ease-in-out infinite;
        }

        .dna-base-right {
          animation: dnaBaseRight 4s ease-in-out infinite;
        }

        @keyframes dnaRotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes dnaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes dnaBaseLeft {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(10px) scale(1.2); }
        }

        @keyframes dnaBaseRight {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(-10px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}