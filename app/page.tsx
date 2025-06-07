"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

const COCONUT_ENDPOINT = "https://937e-34-27-169-199.ngrok-free.app"
const EGGPLANT_ENDPOINT = "https://placeholder-eggplant-endpoint.ngrok.app" // Placeholder as requested

const coconutTreatments = {
  "Bud Root Dropping":
    "Improve soil drainage. Remove/destroy severely infected palms. For chemical control, consult a local expert for recommended soil drench fungicides (e.g., those containing Hexaconazole) and strictly follow the dosage and application instructions on the product label.",
  "Bud Rot":
    "Remove infected tissues early. Consider applying copper-based fungicides or a Bordeaux mixture to the crown. Consult a local expert for appropriate products and timing, and always follow the product label for mixing and application rates.",
  "Gray Leaf Spot":
    "Improve palm nutrition. Prune/burn severely infected older leaves. Fungicides (e.g., containing Mancozeb) are usually only needed if severe; consult an expert to confirm necessity and for recommended products/rates based on the label.",
  "Leaf Rot":
    "Improve palm health and sanitation (remove/destroy infected leaves). For severe cases, fungicides (e.g., containing Mancozeb or Propiconazole) might be suggested by experts. Use only locally approved products and follow label instructions precisely.",
  "Stem Bleeding":
    "Avoid injuring palm base. Carefully chisel out diseased tissue and apply a wound dressing like Bordeaux paste or specialized wound sealant as per expert advice and product instructions. Improve soil drainage.",
  Healthy:
    "The image appears to show a healthy coconut part. Continue good cultural practices like proper nutrition, watering, and sanitation to maintain health. Regularly monitor for any signs of stress or disease.",
}

const eggplantTreatments = {
  Aphids:
    "Control small infestations by spraying plants with a strong stream of water or by introducing beneficial insects like ladybugs. For heavier infestations, apply insecticidal soap or neem oil. Always test on a small area first and strictly follow the product label's instructions for application and pre-harvest intervals.",
  "Cercospora Leaf Spot":
    "Improve air circulation by properly spacing plants and pruning excess foliage. Remove and destroy infected leaves to reduce fungal spores. If the disease is severe, consult an expert about applying a fungicide containing chlorothalonil or a copper-based compound. Use only as recommended and follow all label directions for safety and effectiveness.",
  "Defect Eggplant":
    "Physical defects can be caused by inconsistent watering (leading to cracking) or nutrient deficiencies (like blossom-end rot from lack of calcium). Ensure consistent soil moisture and consider a soil test to identify and correct any nutrient imbalances. For persistent issues, consult an agricultural expert to diagnose the specific cause.",
  "Flea Beetles":
    "Protect young seedlings with floating row covers to create a physical barrier. Yellow sticky traps can help monitor and reduce adult populations. For significant damage, a product containing spinosad or pyrethrin may be recommended by a professional. Consult an expert for timing and always adhere to the label's pre-harvest interval.",
  "Fresh Eggplant / Fresh Eggplant Leaf":
    "The plant or leaf appears healthy. Continue good agricultural practices such as consistent watering, balanced nutrition, and regular scouting for pests and diseases to maintain plant vigor and ensure a productive harvest.",
  "Leaf Wilt":
    "Wilt can be caused by water stress or severe soil-borne disease (like Verticillium or Fusarium wilt). First, check soil moisture and water deeply if dry. If the plant does not recover, it is likely a disease with no cure; remove and destroy the entire plant to prevent spreading. Avoid planting eggplants in the same spot for several years.",
  "Phytophthora Blight":
    "This is a serious disease favored by wet conditions. Improve soil drainage and avoid water splashing onto leaves. Remove and destroy infected plants and fruit immediately. For preventative measures in known problem areas, consult a local expert for recommended fungicides, which may include copper-based products or phosphorous acid. Strict adherence to the product label is crucial.",
  "Powdery Mildew":
    "Increase plant spacing to improve air circulation and reduce humidity. Avoid overhead watering. In the early stages, treatments with horticultural oil, neem oil, or potassium bicarbonate can be effective. For persistent infections, consult a professional for fungicide recommendations and always follow the label's application instructions.",
  "Tobacco Mosaic Virus":
    "There is no cure for this virus. Infected plants must be removed and destroyed immediately to prevent spread. Practice strict sanitation by washing hands and disinfecting tools, especially after using tobacco products. Control insect vectors like aphids. In the future, choose virus-resistant eggplant varieties.",
}

export default function PlantDiseaseDetector() {
  const { theme, setTheme } = useTheme()
  const [selectedPlant, setSelectedPlant] = useState<"coconut" | "eggplant">("coconut")
  const [files, setFiles] = useState<File[]>([])
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles(imageFiles)
    setPredictions([])
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const imageFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles(imageFiles)
    setPredictions([])
    setIsHovering(false)
  }

  const predictDiseases = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)

    const endpoint = selectedPlant === "coconut" ? COCONUT_ENDPOINT : EGGPLANT_ENDPOINT
    const treatments = selectedPlant === "coconut" ? coconutTreatments : eggplantTreatments

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
        const response = await fetch(`${endpoint}/predict`, {
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
    setTimeout(() => setShowConfetti(false), 3000)
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
  const treatments = selectedPlant === "coconut" ? coconutTreatments : eggplantTreatments

  const clearFiles = () => {
    setFiles([])
    setPredictions([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
        theme === "dark"
          ? "from-gray-900 via-gray-900 to-black text-gray-100"
          : "from-green-50 via-emerald-50 to-teal-50 text-gray-900",
      )}
    >
      {/* Floating theme toggle */}
      <div
        className={cn(
          "fixed top-4 right-4 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md shadow-lg rounded-full p-2" : "",
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-primary/10"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-10 flex items-center justify-center">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    initial={{
                      opacity: 1,
                      scale: 0,
                      x: 0,
                      y: 0,
                      backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"][
                        Math.floor(Math.random() * 5)
                      ],
                    }}
                    animate={{
                      opacity: 0,
                      scale: Math.random() * 2 + 0.5,
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1 }}
                className="text-4xl font-bold text-primary"
              >
                <Sparkles className="h-16 w-16" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className={cn(
                "p-4 rounded-full flex items-center justify-center",
                theme === "dark" ? "bg-green-900/30" : "bg-green-100",
              )}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className={cn("h-10 w-10", theme === "dark" ? "text-green-400" : "text-green-600")} />
            </motion.div>
            <h1
              className={cn(
                "text-5xl font-bold bg-clip-text text-transparent",
                theme === "dark"
                  ? "bg-gradient-to-r from-green-400 via-teal-300 to-emerald-400"
                  : "bg-gradient-to-r from-green-600 to-teal-600",
              )}
            >
              Plant Disease Detector
            </h1>
          </div>
          <motion.p
            className={cn("text-lg max-w-2xl mx-auto", theme === "dark" ? "text-gray-300" : "text-gray-600")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Advanced AI-powered disease detection for coconut and eggplant crops with expert treatment recommendations
          </motion.p>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Alert
            className={cn(
              "mb-8 border",
              theme === "dark"
                ? "border-amber-700/50 bg-amber-900/20 text-amber-200"
                : "border-amber-200 bg-amber-50 text-amber-800",
            )}
          >
            <AlertTriangle className={cn("h-4 w-4", theme === "dark" ? "text-amber-300" : "text-amber-600")} />
            <AlertDescription>
              <strong>Important:</strong> Suggestions provided are general information only. Always consult a certified
              agricultural expert or local extension office for accurate diagnosis and treatment recommendations.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Plant Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <Card
            className={cn(
              "overflow-hidden border",
              theme === "dark" ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-primary" />
                Select Plant Type
              </CardTitle>
              <CardDescription>Choose the type of plant you want to analyze for disease detection</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedPlant}
                onValueChange={(value) => setSelectedPlant(value as "coconut" | "eggplant")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  {/* <TabsTrigger
                    value="coconut"
                    className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <span className="text-xl">🥥</span> Coconut Tree
                  </TabsTrigger> */}
                  {/* <TabsTrigger
                    value="eggplant"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <span className="text-xl">🍆</span> Eggplant
                  </TabsTrigger> */}
                  <TabsTrigger
                    value="coconut"
                    className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <img
                      src="/coconut-tree.png"
                      alt="Coconut Tree icon"
                      className="h-6 w-6 object-contain"
                    />
                    Coconut Tree
                  </TabsTrigger>
                  <TabsTrigger
                    value="eggplant"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    {/* The emoji is replaced by the next/image component */}
                    <Image
                      src="/eggplant-image.png"
                      alt="Eggplant icon"
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                    Eggplant
                  </TabsTrigger>
                </TabsList>

                <div className="relative min-h-[180px] overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    {selectedPlant === "coconut" ? (
                      <motion.div
                        key="coconut"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <div
                          className={cn(
                            "h-full rounded-xl p-6 flex items-center",
                            theme === "dark"
                              ? "bg-gradient-to-r from-green-900/40 to-teal-900/40 border border-green-800/30"
                              : "bg-gradient-to-r from-green-100 to-teal-50",
                          )}
                        >
                          <div className="flex-1">
                            <h3
                              className={cn(
                                "text-xl md:text-2xl font-bold mb-2",
                                theme === "dark" ? "text-green-300" : "text-green-800",
                              )}
                            >
                              Coconut Tree Analysis
                            </h3>
                            <p className={cn("mb-4", theme === "dark" ? "text-green-200/80" : "text-green-700")}>
                              Upload images of coconut tree parts to detect diseases like:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["Bud Rot", "Gray Leaf Spot", "Stem Bleeding", "Leaf Rot"].map((disease) => (
                                <Badge
                                  key={disease}
                                  variant="outline"
                                  className={cn(
                                    theme === "dark"
                                      ? "bg-green-900/30 text-green-300 border-green-700"
                                      : "bg-green-100 text-green-800 border-green-200",
                                  )}
                                >
                                  {disease}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div
                              className={cn(
                                "w-24 h-24 rounded-full flex items-center justify-center",
                                theme === "dark" ? "bg-green-900/50" : "bg-green-100",
                              )}
                            >
                              <Image
                                src="/coconut-tree.png"
                                alt="Coconut Tree"
                                width={60}
                                height={60}
                                className="h-auto w-auto object-contain"
                              />
                            </div>  
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="eggplant"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <div
                          className={cn(
                            "h-full rounded-xl p-6 flex items-center",
                            theme === "dark"
                              ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-800/30"
                              : "bg-gradient-to-r from-purple-100 to-indigo-50",
                          )}
                        >
                          <div className="flex-1">
                            <h3
                              className={cn(
                                "text-xl md:text-2xl font-bold mb-2",
                                theme === "dark" ? "text-purple-300" : "text-purple-800",
                              )}
                            >
                              Eggplant Analysis
                            </h3>
                            <p className={cn("mb-4", theme === "dark" ? "text-purple-200/80" : "text-purple-700")}>
                              Upload images of eggplant plants to detect diseases like:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["Aphids", "Leaf Wilt", "Powdery Mildew", "Tobacco Mosaic Virus"].map((disease) => (
                                <Badge
                                  key={disease}
                                  variant="outline"
                                  className={cn(
                                    theme === "dark"
                                      ? "bg-purple-900/30 text-purple-300 border-purple-700"
                                      : "bg-purple-100 text-purple-800 border-purple-200",
                                  )}
                                >
                                  {disease}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            {/* <div
                              className={cn(
                                "w-24 h-24 rounded-full flex items-center justify-center",
                                theme === "dark" ? "bg-purple-900/50" : "bg-purple-100",
                              )}
                            >
                              <span className="text-5xl">🍆</span>
                            </div> */}
                            <div
                              className={cn(
                                "w-24 h-24 rounded-full flex items-center justify-center",
                                theme === "dark" ? "bg-purple-900/50" : "bg-purple-100",
                              )}
                            >
                              {/* The large emoji is also replaced by the image */}
                              <Image
                                src="/eggplant-image.png"
                                alt="Eggplant"
                                width={60}
                                height={60}
                                className="h-auto w-auto object-contain"
                              />
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

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <Card
            className={cn(
              "overflow-hidden border",
              theme === "dark" ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Images
              </CardTitle>
              <CardDescription>Select multiple images for batch disease detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
                  "relative overflow-hidden",
                  isHovering
                    ? theme === "dark"
                      ? "border-primary bg-primary/10"
                      : "border-green-400 bg-green-50"
                    : theme === "dark"
                      ? "border-gray-700"
                      : "border-gray-300",
                  theme === "dark" ? "hover:border-primary" : "hover:border-green-400",
                )}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsHovering(true)
                }}
                onDragLeave={() => setIsHovering(false)}
                onClick={() => fileInputRef.current?.click()}
              >
                {/* Animated background effect */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-20 pointer-events-none",
                    isHovering ? "opacity-30" : "opacity-10",
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                </div>

                <motion.div
                  animate={{
                    y: isHovering ? -5 : 0,
                    scale: isHovering ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10"
                >
                  <Upload
                    className={cn(
                      "h-16 w-16 mx-auto mb-4 transition-colors",
                      theme === "dark"
                        ? isHovering
                          ? "text-primary"
                          : "text-gray-400"
                        : isHovering
                          ? "text-green-600"
                          : "text-gray-400",
                    )}
                  />
                  <p className="text-xl font-medium mb-2">Drop images here or click to select</p>
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
                    Supports JPG, PNG, and other image formats
                  </p>
                </motion.div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("px-3 py-1", theme === "dark" ? "bg-gray-800" : "bg-gray-100")}
                      >
                        {files.length} image{files.length !== 1 ? "s" : ""}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFiles}
                        className={theme === "dark" ? "text-gray-400 hover:text-white" : ""}
                      >
                        <X className="h-4 w-4 mr-1" /> Clear
                      </Button>
                    </div>
                    <Button
                      onClick={predictDiseases}
                      disabled={isProcessing}
                      className={cn(
                        "relative overflow-hidden group",
                        theme === "dark"
                          ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
                          : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500",
                      )}
                    >
                      {/* Button background animation */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

                      <span className="relative flex items-center">
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Analyze Images
                          </>
                        )}
                      </span>
                    </Button>
                  </div>

                  {isProcessing && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                          Processing images...
                        </span>
                        <span
                          className={cn("text-sm font-medium", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                        >
                          {Math.round(processingProgress)}%
                        </span>
                      </div>
                      <Progress
                        value={processingProgress}
                        className={cn("h-2", theme === "dark" ? "bg-gray-800" : "")}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {files.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <div className="group relative aspect-square rounded-lg overflow-hidden border">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white">
                                    <Maximize2 className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
                                  <img
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={file.name}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                  />
                                </DialogContent>
                              </Dialog>
                              <p className="text-white text-xs mt-2 px-2">
                                {file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        {predictions.length > 0 && (
          <>
            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Card
                className={cn(
                  "overflow-hidden border",
                  theme === "dark" ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
                )}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Total Images",
                        value: stats.total,
                        color: theme === "dark" ? "text-blue-400" : "text-blue-600",
                        bgColor: theme === "dark" ? "bg-blue-900/30" : "bg-blue-100",
                      },
                      {
                        label: "Successful",
                        value: stats.successful,
                        color: theme === "dark" ? "text-green-400" : "text-green-600",
                        bgColor: theme === "dark" ? "bg-green-900/30" : "bg-green-100",
                      },
                      {
                        label: "Failed",
                        value: stats.failed,
                        color: theme === "dark" ? "text-red-400" : "text-red-600",
                        bgColor: theme === "dark" ? "bg-red-900/30" : "bg-red-100",
                      },
                      {
                        label: "Avg Time",
                        value: `${stats.avgTime.toFixed(2)}s`,
                        color: theme === "dark" ? "text-purple-400" : "text-purple-600",
                        bgColor: theme === "dark" ? "bg-purple-900/30" : "bg-purple-100",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div
                          className={cn(
                            "rounded-xl p-4 text-center h-full flex flex-col items-center justify-center",
                            stat.bgColor,
                          )}
                        >
                          <div className={cn("text-3xl font-bold mb-1", stat.color)}>{stat.value}</div>
                          <div className={cn("text-sm", theme === "dark" ? "text-gray-300" : "text-gray-600")}>
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Disease distribution */}
                  {Object.keys(stats.classCounts).length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4
                        className={cn("text-sm font-medium mb-3", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                      >
                        Disease Distribution
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(stats.classCounts).map(([disease, count], index) => (
                          <motion.div
                            key={disease}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                            className="flex items-center"
                          >
                            <div className="w-1/3 sm:w-1/4 text-sm truncate pr-2" title={disease}>
                              {disease}
                            </div>
                            <div className="flex-1">
                              <div className="relative h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <motion.div
                                  className={cn(
                                    "absolute top-0 left-0 h-full rounded-full",
                                    disease.toLowerCase().includes("healthy") || disease.toLowerCase().includes("fresh")
                                      ? theme === "dark"
                                        ? "bg-green-500"
                                        : "bg-green-600"
                                      : theme === "dark"
                                        ? "bg-amber-500"
                                        : "bg-amber-600",
                                  )}
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${(count / stats.total) * 100}%` }}
                                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                />
                              </div>
                            </div>
                            <div className="w-10 text-right text-sm font-medium">{count}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Prediction Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <Card
                    className={cn(
                      "overflow-hidden h-full flex flex-col",
                      theme === "dark"
                        ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70"
                        : "bg-white/80 backdrop-blur-sm hover:bg-white",
                      "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    )}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={prediction.imageUrl || "/placeholder.svg"}
                        alt="Analyzed image"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />

                      {/* Image overlay with zoom button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white">
                              <Maximize2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
                            <img
                              src={prediction.imageUrl || "/placeholder.svg"}
                              alt="Full size preview"
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                          </DialogContent>
                        </Dialog>
                      </div>

                      {prediction.isProcessing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                          <div className="text-white text-center">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-white animate-spin" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-white animate-pulse" />
                              </div>
                            </div>
                            <p className="text-sm mt-2">Analyzing...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 flex-grow">
                      {prediction.error ? (
                        <div className="text-center h-full flex flex-col items-center justify-center py-4">
                          <Badge variant="destructive" className="mb-3 px-3 py-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                            Error
                          </Badge>
                          <p className={cn("text-sm", theme === "dark" ? "text-red-400" : "text-red-600")}>
                            {prediction.error}
                          </p>
                        </div>
                      ) : prediction.predicted_class ? (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "px-3 py-1.5 text-sm font-medium",
                                prediction.predicted_class.toLowerCase().includes("healthy") ||
                                  prediction.predicted_class.toLowerCase().includes("fresh")
                                  ? theme === "dark"
                                    ? "bg-green-900/40 text-green-300 border-green-700"
                                    : "bg-green-100 text-green-800 border-green-200"
                                  : theme === "dark"
                                    ? "bg-amber-900/40 text-amber-300 border-amber-700"
                                    : "bg-amber-100 text-amber-800 border-amber-200",
                              )}
                            >
                              {prediction.predicted_class.toLowerCase().includes("healthy") ||
                                prediction.predicted_class.toLowerCase().includes("fresh") ? (
                                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                              ) : (
                                <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                              )}
                              {prediction.predicted_class}
                            </Badge>
                            {prediction.inference_time_seconds && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className={cn(
                                        "flex items-center text-xs",
                                        theme === "dark" ? "text-gray-400" : "text-gray-500",
                                      )}
                                    >
                                      <Clock className="h-3 w-3 mr-1" />
                                      {prediction.inference_time_seconds.toFixed(2)}s
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Processing time</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div
                            className={cn(
                              "text-sm leading-relaxed",
                              theme === "dark" ? "text-gray-300" : "text-gray-700",
                            )}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <Droplets
                                className={cn(
                                  "h-4 w-4 mt-0.5 flex-shrink-0",
                                  theme === "dark" ? "text-blue-400" : "text-blue-600",
                                )}
                              />
                              <strong>Treatment:</strong>
                            </div>
                            <p>
                              {treatments[prediction.predicted_class as keyof typeof treatments] ||
                                "Consult a local agricultural expert for specific treatment recommendations."}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                    <CardFooter
                      className={cn(
                        "px-5 py-3 text-xs italic border-t",
                        theme === "dark" ? "text-gray-400 border-gray-800" : "text-gray-500 border-gray-200",
                      )}
                    >
                      <p>
                        <strong>Disclaimer:</strong> General suggestion only. Always consult a certified local expert
                        for accurate diagnosis.
                      </p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
