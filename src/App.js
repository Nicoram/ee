import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Clock,
  SlidersHorizontal,
  Sparkles,
  Activity,
  Settings,
  Power,
  Smartphone,
  Bell,
  Home,
  Wifi,
  Volume2,
  Save,
  ChevronRight,
} from "lucide-react";

export default function CircadiaApp() {
  const [activeTab, setActiveTab] = useState("lumiere");
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [temperature, setTemperature] = useState(4200);
  const [wakeTime, setWakeTime] = useState("07:30");
  const [sunriseDuration, setSunriseDuration] = useState(30);
  const [sleepTime, setSleepTime] = useState("22:45");
  const [ambientMode, setAmbientMode] = useState("Réveil naturel");

  const tabs = [
    { id: "lumiere", label: "Lumière", icon: Sun },
    { id: "heure", label: "Heure", icon: Clock },
    { id: "ambiances", label: "Ambiances", icon: Sparkles },
    { id: "routine", label: "Routine", icon: Activity },
    { id: "maison", label: "Maison", icon: Home },
    { id: "parametres", label: "Réglages", icon: Settings },
  ];

  const temperatureLabel = useMemo(() => {
    if (temperature < 3000) return "Chaud et apaisant";
    if (temperature < 5000) return "Naturel et équilibré";
    return "Clair et énergisant";
  }, [temperature]);

  const intensityText = isOn ? `${brightness}%` : "Éteinte";

  return (
    <div className="min-h-screen bg-[#0f0c09] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md min-h-[860px] rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#1d1712] to-[#070605] shadow-2xl overflow-hidden">
        <header className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs tracking-[0.35em] text-amber-300/80">CIRCADIA</p>
              <h1 className="mt-2 text-2xl font-semibold">Ma lampe</h1>
              <p className="text-sm text-white/50">Chambre principale</p>
            </div>
            <button
              onClick={() => setIsOn(!isOn)}
              className={`h-12 w-12 rounded-full transition ${
                isOn ? "bg-amber-400 text-black" : "bg-white/10 text-white"
              }`}
            >
              <Power size={22} />
            </button>
          </div>

          <div className="mt-6 border border-white/10 bg-black/30 rounded-3xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50">État actuel</p>
                  <p className="text-3xl font-semibold mt-1">{intensityText}</p>
                </div>
                <motion.div
                  animate={{
                    scale: isOn ? [1, 1.05, 1] : 1,
                    opacity: isOn ? 1 : 0.35,
                  }}
                  transition={{ repeat: isOn ? Infinity : 0, duration: 2.5 }}
                  className="h-24 w-24 rounded-full bg-amber-300/30 border border-amber-200/60 shadow-[0_0_60px_rgba(251,191,36,0.55)] flex items-center justify-center"
                >
                  <Sun className="text-amber-100" size={42} />
                </motion.div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <StatusPill label="Réveil" value={wakeTime} />
                <StatusPill label="Mode" value={ambientMode} />
                <StatusPill label="Wi-Fi" value="Connecté" />
              </div>
            </div>
          </div>
        </header>

        <nav className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-fit rounded-full px-4 py-3 flex items-center gap-2 text-sm transition ${
                  selected
                    ? "bg-amber-400 text-black"
                    : "bg-white/8 text-white/70 border border-white/10"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <main className="p-5 pt-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 400px)" }}>
          {activeTab === "lumiere" && (
            <Section
              title="Réglage de la lumière"
              subtitle="Adaptez CIRCADIA à votre réveil, votre humeur et votre pièce."
            >
              <SliderCard
                icon={<SlidersHorizontal size={20} />}
                title="Luminosité"
                value={`${brightness}%`}
                min="1"
                max="100"
                inputValue={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
              <SliderCard
                icon={<Sun size={20} />}
                title="Température de couleur"
                value={`${temperature}K`}
                min="1800"
                max="6500"
                inputValue={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
              />
              <FeatureCard
                title={temperatureLabel}
                text="Une lumière plus chaude favorise la détente. Une lumière plus claire aide à se sentir plus éveillé le matin."
              />
            </Section>
          )}

          {activeTab === "heure" && (
            <Section
              title="Heure et réveil"
              subtitle="Programmez un lever de soleil progressif, sans réveil brutal."
            >
              <InputCard
                icon={<Clock size={20} />}
                label="Heure de réveil"
                value={wakeTime}
                onChange={setWakeTime}
                type="time"
              />
              <SliderCard
                icon={<Sun size={20} />}
                title="Durée de simulation d'aube"
                value={`${sunriseDuration} min`}
                min="10"
                max="60"
                inputValue={sunriseDuration}
                onChange={(e) => setSunriseDuration(Number(e.target.value))}
              />
              <InputCard
                icon={<Moon size={20} />}
                label="Extinction progressive"
                value={sleepTime}
                onChange={setSleepTime}
                type="time"
              />
              <FeatureCard
                title="Votre matin commence avant l'alarme"
                text={`La lumière augmente progressivement ${sunriseDuration} minutes avant ${wakeTime}.`}
              />
            </Section>
          )}

          {activeTab === "ambiances" && (
            <Section
              title="Ambiances"
              subtitle="Choisissez un mode adapté à chaque moment de la journée."
            >
              <ModeGrid selected={ambientMode} onSelect={setAmbientMode} />
            </Section>
          )}

          {activeTab === "routine" && (
            <Section
              title="Routine bien-être"
              subtitle="Créez une journée plus régulière avec des automatismes simples."
            >
              <ToggleRow
                icon={<Bell size={20} />}
                title="Rappel coucher"
                text="Notification 30 min avant l'extinction."
              />
              <ToggleRow
                icon={<Activity size={20} />}
                title="Suivi du rythme"
                text="Conseils selon vos horaires de sommeil."
              />
              <ToggleRow
                icon={<Moon size={20} />}
                title="Mode nuit"
                text="Lumière très douce après 22h."
              />
              <FeatureCard
                title="Objectif"
                text="Vous aider à vous réveiller plus naturellement et à garder un rythme stable."
              />
            </Section>
          )}

          {activeTab === "maison" && (
            <Section
              title="Maison connectée"
              subtitle="Connectez CIRCADIA à vos assistants et à vos pièces."
            >
              <ToggleRow
                icon={<Wifi size={20} />}
                title="Wi-Fi"
                text="Réseau Maison_5G connecté."
                activeDefault
              />
              <ToggleRow
                icon={<Smartphone size={20} />}
                title="Application mobile"
                text="Contrôle à distance activé."
                activeDefault
              />
              <ToggleRow
                icon={<Volume2 size={20} />}
                title="Commandes vocales"
                text="Compatible Alexa et Google Assistant."
              />
              <DeviceCard />
            </Section>
          )}

          {activeTab === "parametres" && (
            <Section
              title="Réglages"
              subtitle="Personnalisez l'expérience client et les paramètres de la lampe."
            >
              <SettingRow title="Nom de la lampe" value="CIRCADIA Chambre" />
              <SettingRow title="Garantie" value="2 ans" />
              <SettingRow title="Consommation" value="LED économie" />
              <SettingRow title="Mise à jour" value="À jour" />
            </Section>
          )}
        </main>

        <footer className="p-5 pt-0">
          <button className="w-full h-14 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-semibold flex items-center justify-center gap-2">
            <Save size={18} />
            Enregistrer la configuration
          </button>
        </footer>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-white/50 leading-relaxed">{subtitle}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </motion.section>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/6 border border-white/10 p-3">
      <p className="text-[11px] text-white/40">{label}</p>
      <p className="text-xs font-medium mt-1 truncate">{value}</p>
    </div>
  );
}

function SliderCard({ icon, title, value, inputValue, min, max, onChange }) {
  return (
    <div className="rounded-3xl border-white/10 bg-white/6 border">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
              {icon}
            </div>
            <p className="font-medium">{title}</p>
          </div>
          <p className="text-amber-300 font-semibold">{value}</p>
        </div>
        <input
          className="mt-5 w-full accent-amber-400 cursor-pointer"
          type="range"
          min={min}
          max={max}
          value={inputValue}
          onChange={onChange}
        />
        <div className="mt-2 flex justify-between text-xs text-white/35">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}

function InputCard({ icon, label, value, onChange, type = "text" }) {
  return (
    <div className="rounded-3xl border-white/10 bg-white/6 border">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
            {icon}
          </div>
          <p className="font-medium">{label}</p>
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
      <p className="text-amber-200 font-semibold">{title}</p>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{text}</p>
    </div>
  );
}

function ModeGrid({ selected, onSelect }) {
  const modes = [
    { name: "Réveil naturel", icon: Sun, desc: "Aube progressive" },
    { name: "Relaxation", icon: Moon, desc: "Lumière chaude" },
    { name: "Lecture", icon: Sparkles, desc: "Confort visuel" },
    { name: "Énergie", icon: Activity, desc: "Lumière claire" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const active = selected === mode.name;
        return (
          <button
            key={mode.name}
            onClick={() => onSelect(mode.name)}
            className={`text-left rounded-3xl p-4 border transition ${
              active
                ? "bg-amber-400 text-black border-amber-300"
                : "bg-white/6 border-white/10 text-white"
            }`}
          >
            <Icon size={24} />
            <p className="mt-4 font-semibold">{mode.name}</p>
            <p className={`text-xs mt-1 ${
              active ? "text-black/60" : "text-white/45"
            }`}>
              {mode.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function ToggleRow({ icon, title, text, activeDefault = false }) {
  const [active, setActive] = useState(activeDefault);
  return (
    <button
      onClick={() => setActive(!active)}
      className="w-full rounded-3xl border border-white/10 bg-white/6 p-5 flex items-center justify-between text-left"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-white/45 mt-1">{text}</p>
        </div>
      </div>
      <div
        className={`h-7 w-12 rounded-full p-1 transition ${
          active ? "bg-amber-400" : "bg-white/15"
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white transition ${
            active ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}

function DeviceCard() {
  return (
    <div className="rounded-3xl border-white/10 bg-gradient-to-br from-white/10 to-white/4 border">
      <div className="p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold">Ajouter une pièce</p>
          <p className="text-sm text-white/45 mt-1">Salon, chambre enfant, bureau...</p>
        </div>
        <ChevronRight className="text-white/50" />
      </div>
    </div>
  );
}

function SettingRow({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/6 border border-white/10 p-4 flex items-center justify-between">
      <p className="text-white/70">{title}</p>
      <p className="font-medium text-amber-200">{value}</p>
    </div>
  );
}
