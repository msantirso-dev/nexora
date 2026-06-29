"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, TrendingUp, Package, Bell, Users, ShoppingCart,
  FileText, Truck, Megaphone, Settings, Database, HeadphonesIcon, Layers,
  CheckCircle2, AlertTriangle, Clock, Zap, ArrowDown, Sparkles, LineChart,
  PieChart, Activity, Calendar, DollarSign, Boxes, Network, Brain,
  MessageSquare, Mail, FileSpreadsheet, ChevronRight, Plus, Search,
  Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Wifi, Server,
  ClipboardCheck, Target, Gauge, ListChecks, FolderKanban, X, Menu,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const COLORS = {
  navy: "#0A1628",
  navyDeep: "#050B14",
  ink: "#0F1B2D",
  slate: "#64748B",
  slateLight: "#94A3B8",
  border: "rgba(15, 27, 45, 0.08)",
  borderDark: "rgba(255, 255, 255, 0.08)",
  electric: "#2563EB",
  cyan: "#06B6D4",
  paper: "#F8FAFC",
};

/* ============================================================
   PRIMITIVES
   ============================================================ */

function Section({ children, className = "", dark = false, id }) {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
      style={{ backgroundColor: dark ? "#070D18" : "#FFFFFF", color: dark ? "#FFFFFF" : "#0A1628" }}
    >
      {children}
    </section>
  );
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 ${className}`}>{children}</div>;
}

function Eyebrow({ children, dark = false }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-wide"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(10,22,40,0.08)",
        backgroundColor: dark ? "rgba(255,255,255,0.03)" : "rgba(10,22,40,0.03)",
        color: dark ? "#67E8F9" : "#2563EB",
      }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563EB] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
      </span>
      {children}
    </div>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: "easeOut" },
  };
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 active:scale-[0.98] ${className}`}
      style={{ backgroundColor: "#0A1628" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#142238")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0A1628")}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to right, #2563EB, #06B6D4)" }} />
    </button>
  );
}

function GhostButton({ children, onClick, dark = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-[14.5px] font-medium transition-all duration-300 active:scale-[0.98] ${
        dark
          ? "border-white/10 text-white hover:bg-white/5"
          : "border-slate-200 text-[#0A1628] hover:bg-slate-50"
      } ${className}`}
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

/* ============================================================
   FLOATING DASHBOARD (Hero illustration, all SVG/CSS, no images)
   ============================================================ */

function MiniBarChart() {
  const bars = [38, 62, 45, 78, 58, 90, 70];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.9, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-sm"
          style={{
            background: i === 5 ? "linear-gradient(180deg,#06B6D4,#2563EB)" : "rgba(37,99,235,0.18)",
          }}
        />
      ))}
    </div>
  );
}

function MiniSparkline() {
  return (
    <svg viewBox="0 0 200 60" className="h-14 w-full overflow-visible">
      <motion.path
        d="M0,45 C20,42 30,20 50,24 C70,28 80,10 100,14 C120,18 130,38 150,30 C170,22 180,8 200,5"
        fill="none"
        stroke="#06B6D4"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M0,45 C20,42 30,20 50,24 C70,28 80,10 100,14 C120,18 130,38 150,30 C170,22 180,8 200,5 L200,60 L0,60 Z"
        fill="url(#sparkFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RadialGauge({ value = 78 }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg viewBox="0 0 90 90" className="h-24 w-24 -rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="7" />
        <motion.circle
          cx="45" cy="45" r={r} fill="none" stroke="#2563EB" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-semibold text-[#0A1628]">{value}%</span>
      </div>
    </div>
  );
}

function FloatingDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[560px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl"
        style={{ backgroundColor: "rgba(13,26,46,0.9)", boxShadow: "0 30px 90px -20px rgba(37,99,235,0.35), 0 10px 40px -10px rgba(0,0,0,0.5)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-[11px] font-medium text-white/40">panel-operativo.empresa</span>
          <Bell className="h-3.5 w-3.5 text-white/30" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-white/40">
              <TrendingUp className="h-3 w-3" /> Ventas
            </div>
            <div className="text-[20px] font-semibold text-white">$284k</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-400">
              <ArrowUpRight className="h-3 w-3" /> 18.2%
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-white/40">
              <Boxes className="h-3 w-3" /> Stock
            </div>
            <div className="text-[20px] font-semibold text-white">1,842</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-cyan-300">
              <Activity className="h-3 w-3" /> Sincronizado
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-white/40">
              <Gauge className="h-3 w-3" /> Eficiencia
            </div>
            <div className="text-[20px] font-semibold text-white">92%</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-400">
              <ArrowUpRight className="h-3 w-3" /> 6.4%
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-3">
          <div className="col-span-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/50">Productividad semanal</span>
              <span className="text-[11px] text-white/30">7d</span>
            </div>
            <MiniBarChart />
          </div>
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-3.5">
            <span className="text-[11px] font-medium text-white/50">Rentabilidad</span>
            <div className="mt-1 flex items-center justify-center">
              <RadialGaugeWhite value={78} />
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/50">Flujo de caja proyectado</span>
            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">en vivo</span>
          </div>
          <MiniSparkline />
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl px-3.5 py-2.5" style={{ border: "1px solid rgba(251,191,36,0.15)", backgroundColor: "rgba(251,191,36,0.06)" }}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
            <span className="text-[11.5px] text-amber-100/90">3 alertas de reposición de stock</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-amber-300/60" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-10 -top-8 hidden rounded-xl border border-white/10 px-4 py-3 shadow-xl backdrop-blur-xl lg:block"
        style={{ backgroundColor: "rgba(13,26,46,0.95)" }}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-400/10 p-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-white">Proceso automatizado</div>
            <div className="text-[10px] text-white/40">Facturación → CRM</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -right-8 hidden rounded-xl border border-white/10 px-4 py-3 shadow-xl backdrop-blur-xl lg:block"
        style={{ backgroundColor: "rgba(13,26,46,0.95)" }}
      >
        <div className="flex items-center gap-3">
          <Brain className="h-4 w-4 text-cyan-300" />
          <div>
            <div className="text-[11px] font-medium text-white">IA Gerencial</div>
            <div className="text-[10px] text-white/40">Predicción +14% Q3</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RadialGaugeWhite({ value = 78 }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <svg viewBox="0 0 70 70" className="h-20 w-20 -rotate-90">
        <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <motion.circle
          cx="35" cy="35" r={r} fill="none" stroke="#06B6D4" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-semibold text-white">{value}%</span>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 1 — HERO
   ============================================================ */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "#070D18" }} />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.4,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-10%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.16), transparent 70%)" }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[5%] top-[15%] h-[500px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)" }}
      />
    </div>
  );
}

function Hero({ onCta }) {
  return (
    <Section dark className="min-h-screen overflow-hidden pt-28 pb-20 md:pt-32">
      <HeroBackground />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div {...fadeUp(0)}>
              <Eyebrow dark>Auditoría y transformación digital empresarial</Eyebrow>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-7 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[3.1rem] lg:text-[3.4rem]"
            >
              ¿Tu empresa creció pero sigue funcionando con{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                procesos de hace diez años
              </span>
              ?
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/50">
              Descubrimos dónde tu empresa pierde tiempo y dinero, y diseñamos soluciones tecnológicas que
              automatizan procesos, reducen costos y permiten escalar el negocio.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={onCta}>Solicitar auditoría</PrimaryButton>
              <GhostButton dark>Conocer la metodología</GhostButton>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
              {[
                ["+120", "Procesos auditados"],
                ["38%", "Reducción de costos promedio"],
                ["4.6x", "ROI en 12 meses"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-semibold text-white">{n}</div>
                  <div className="text-[12.5px] text-white/40">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <FloatingDashboard />
          </div>
        </div>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/30 md:flex"
      >
        <span className="text-[11px] tracking-wide">Descubrí más</span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.div>
    </Section>
  );
}

/* ============================================================
   SECTION 2 — CAOS DE DATOS → ORDEN
   ============================================================ */

function ScatteredIcon({ icon: Icon, label, x, y, rotate, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, x, y, rotate, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2.5 shadow-[0_8px_30px_-8px_rgba(10,22,40,0.12)]"
      style={{ borderColor: COLORS.border, left: "50%", top: "50%" }}
    >
      <Icon className="h-4 w-4" style={{ color }} />
      <span className="text-[12.5px] font-medium text-[#0A1628]">{label}</span>
    </motion.div>
  );
}

function ChaosToOrder() {
  const items = [
    { icon: FileSpreadsheet, label: "Excel", x: -260, y: -140, rotate: -8, color: "#16A34A" },
    { icon: Mail, label: "Emails", x: 220, y: -160, rotate: 6, color: "#2563EB" },
    { icon: MessageSquare, label: "WhatsApp", x: -300, y: 60, rotate: 5, color: "#16A34A" },
    { icon: FileText, label: "Facturas", x: 260, y: 40, rotate: -5, color: "#D97706" },
    { icon: Boxes, label: "Stock", x: -160, y: 160, rotate: 9, color: "#7C3AED" },
    { icon: ShoppingCart, label: "Pedidos", x: 150, y: 170, rotate: -7, color: "#DC2626" },
    { icon: Users, label: "Clientes", x: 0, y: -210, rotate: 3, color: "#06B6D4" },
  ];

  return (
    <Section className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow>Diagnóstico</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem]">
            La mayoría de las empresas ya tiene los datos.
            <br />
            <span className="text-[#64748B]">El problema es que nadie los conecta.</span>
          </motion.h2>
        </div>

        <div className="relative mx-auto mt-24 flex h-[420px] max-w-3xl items-center justify-center md:mt-28">
          {items.map((it, i) => (
            <ScatteredIcon key={it.label} {...it} delay={i * 0.07} />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-32 w-32 items-center justify-center rounded-2xl border"
            style={{
              borderColor: "rgba(37,99,235,0.18)",
              background: "linear-gradient(140deg, #0A1628, #142A4D)",
              boxShadow: "0 25px 60px -15px rgba(37,99,235,0.35)",
            }}
          >
            <Network className="h-12 w-12 text-cyan-300" />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl border border-cyan-400/30"
            />
          </motion.div>

          <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
            {items.map((it, i) => (
              <motion.line
                key={it.label}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${it.x}px)`}
                y2={`calc(50% + ${it.y}px)`}
                stroke="#2563EB"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.25 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.9 + i * 0.05 }}
              />
            ))}
          </svg>
        </div>

        <motion.p {...fadeUp(0.2)} className="mx-auto mt-16 max-w-lg text-center text-[15px] text-[#64748B]">
          Auditamos cómo fluye la información en tu empresa y la conectamos en una sola plataforma inteligente.
        </motion.p>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 3 — ¿TE RESULTA FAMILIAR?
   ============================================================ */

function PainCard({ icon: Icon, text, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(10,22,40,0.12)]"
      style={{ borderColor: COLORS.border }}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: "rgba(37,99,235,0.04)" }} />
      <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(10,22,40,0.04)" }}>
        <Icon className="h-5 w-5 text-[#2563EB]" />
      </div>
      <p className="relative text-[15.5px] font-medium leading-snug text-[#0A1628]">{text}</p>
    </motion.div>
  );
}

function FamiliarPains() {
  const pains = [
    { icon: Boxes, text: "El stock nunca coincide." },
    { icon: Truck, text: "Las compras llegan tarde." },
    { icon: FileSpreadsheet, text: "Nadie sabe cuál es el último Excel." },
    { icon: Clock, text: "Hay tareas repetitivas que consumen el día." },
    { icon: Database, text: "Se pierde información entre áreas." },
    { icon: Users, text: "Los clientes esperan más de lo que deberían." },
  ];
  return (
    <Section dark className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow dark>Síntomas frecuentes</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight text-white sm:text-[2.5rem]">
            ¿Te resulta familiar?
          </motion.h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p, i) => (
            <div key={p.text} className="rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-white/10 hover:bg-white/5">
              <motion.div {...fadeUp(i * 0.08)}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <p.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <p className="text-[15.5px] font-medium leading-snug text-white/90">{p.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 4 — METODOLOGÍA (TIMELINE)
   ============================================================ */

function Methodology() {
  const steps = [
    { icon: Search, label: "Auditoría" },
    { icon: ClipboardCheck, label: "Diagnóstico" },
    { icon: Target, label: "Plan de acción" },
    { icon: Zap, label: "Automatización" },
    { icon: Network, label: "Integración" },
    { icon: Brain, label: "IA" },
    { icon: Sparkles, label: "Empresa inteligente" },
  ];
  return (
    <Section className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow>Cómo trabajamos</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight sm:text-[2.5rem]">
            Nuestra metodología
          </motion.h2>
        </div>

        <div className="relative mt-20 overflow-x-auto pb-4">
          <div className="relative mx-auto flex min-w-[760px] items-start justify-between md:min-w-0">
            <div className="absolute left-0 right-0 top-7 h-[2px]" style={{ backgroundColor: "rgba(10,22,40,0.08)" }} />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute left-0 right-0 top-7 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex w-[100px] flex-col items-center text-center"
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white shadow-sm"
                  style={{ borderColor: i === 6 ? "#2563EB" : "rgba(10,22,40,0.1)" }}
                >
                  <s.icon className="h-5 w-5" style={{ color: i === 6 ? "#2563EB" : "rgba(10,22,40,0.6)" }} />
                </div>
                <span className="text-[13px] font-medium leading-tight text-[#0A1628]">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 5 — RADIOGRAFÍA DIGITAL EMPRESARIAL
   ============================================================ */

function DonutChart({ value, color, size = 88 }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(10,22,40,0.07)" strokeWidth="8" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function DigitalAudit() {
  const processMap = [
    { name: "Ventas", level: "alto", color: "#16A34A" },
    { name: "Stock", level: "crítico", color: "#DC2626" },
    { name: "Compras", level: "medio", color: "#D97706" },
    { name: "Administración", level: "crítico", color: "#DC2626" },
    { name: "Marketing", level: "medio", color: "#D97706" },
    { name: "Producción", level: "alto", color: "#16A34A" },
  ];
  return (
    <Section dark className="py-28 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div {...fadeUp(0)}>
              <Eyebrow dark>El primer paso</Eyebrow>
            </motion.div>
            <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.5rem]">
              Radiografía digital empresarial
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/50">
              Esta es nuestra auditoría: un relevamiento completo de tus procesos para identificar dónde se
              pierde tiempo, dinero y oportunidades de crecimiento.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Índice de madurez digital", Gauge],
                ["Mapa de procesos", Network],
                ["Costo oculto", DollarSign],
                ["ROI estimado", TrendingUp],
              ].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Icon className="h-4 w-4 flex-shrink-0 text-cyan-300" />
                  <span className="text-[13px] text-white/75">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...scaleIn(0.1)} className="rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8" style={{ backgroundColor: "rgba(13,26,46,0.8)" }}>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <div className="text-[12px] text-white/40">Índice de madurez digital</div>
                <div className="mt-1 text-3xl font-semibold text-white">42<span className="text-base text-white/40">/100</span></div>
              </div>
              <div className="relative">
                <DonutChart value={42} color="#06B6D4" size={84} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-amber-300" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-[12px] font-medium text-white/40">Mapa de procesos críticos</div>
              <div className="space-y-2.5">
                {processMap.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3.5 py-2.5"
                  >
                    <span className="text-[13px] text-white/80">{p.name}</span>
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: `${p.color}22`, color: p.color }}>
                      {p.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
              <div>
                <div className="text-[11px] text-white/40">Horas perdidas / mes</div>
                <div className="mt-1 text-xl font-semibold text-white">312 hs</div>
              </div>
              <div>
                <div className="text-[11px] text-white/40">ROI estimado 12 meses</div>
                <div className="mt-1 text-xl font-semibold text-emerald-400">4.6x</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 6 — CASOS DE APLICACIÓN
   ============================================================ */

function IsoIcon({ icon: Icon, color }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <div
        className="absolute h-10 w-10 rotate-45 rounded-md"
        style={{ background: `${color}14`, border: `1px solid ${color}30` }}
      />
      <Icon className="relative h-5 w-5" style={{ color }} />
    </div>
  );
}

function UseCaseCard({ icon, label, color, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -5, borderColor: color }}
      className="group flex flex-col items-start gap-4 rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-[0_18px_40px_-15px_rgba(10,22,40,0.14)]"
      style={{ borderColor: COLORS.border }}
    >
      <IsoIcon icon={icon} color={color} />
      <span className="text-[14.5px] font-medium text-[#0A1628]">{label}</span>
    </motion.div>
  );
}

function UseCases() {
  const cases = [
    { icon: FileText, label: "Administración", color: "#2563EB" },
    { icon: Users, label: "CRM", color: "#7C3AED" },
    { icon: Megaphone, label: "Marketing", color: "#DC2626" },
    { icon: ShoppingCart, label: "Ventas", color: "#16A34A" },
    { icon: Boxes, label: "Stock", color: "#D97706" },
    { icon: Truck, label: "Compras", color: "#06B6D4" },
    { icon: Settings, label: "Producción", color: "#64748B" },
    { icon: Users, label: "RRHH", color: "#DB2777" },
    { icon: Database, label: "ERP", color: "#2563EB" },
    { icon: BarChart3, label: "Business intelligence", color: "#7C3AED" },
    { icon: HeadphonesIcon, label: "Mesa de ayuda", color: "#16A34A" },
    { icon: FolderKanban, label: "Documentación", color: "#D97706" },
  ];
  return (
    <Section className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow>Dónde aplicamos</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight sm:text-[2.5rem]">
            Casos de aplicación
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-5 text-[15.5px] text-[#64748B]">
            Empezás resolviendo un problema puntual. El sistema crece con tu empresa.
          </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cases.map((c, i) => (
            <UseCaseCard key={c.label} {...c} delay={(i % 4) * 0.06} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 7 — FLUJO DE AUTOMATIZACIÓN
   ============================================================ */

function FlowNode({ icon: Icon, label, delay, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center gap-2.5"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
          active ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5"
        }`}
      >
        <Icon className={`h-6 w-6 ${active ? "text-cyan-300" : "text-white/70"}`} />
      </div>
      <span className="max-w-[88px] text-center text-[12px] font-medium leading-tight text-white/75">{label}</span>
    </motion.div>
  );
}

function AutomationFlow() {
  const nodes = [
    { icon: ShoppingCart, label: "Cliente compra" },
    { icon: Server, label: "Sistema" },
    { icon: Boxes, label: "Actualiza stock" },
    { icon: FileText, label: "Factura" },
    { icon: Users, label: "CRM" },
    { icon: Truck, label: "Logística" },
    { icon: BarChart3, label: "Dashboard" },
    { icon: Brain, label: "IA genera indicadores", active: true },
  ];
  return (
    <Section dark className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow dark>En acción</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight text-white sm:text-[2.5rem]">
            Automatización de punta a punta
          </motion.h2>
        </div>

        <div className="relative mt-20 overflow-x-auto pb-6">
          <div className="relative mx-auto flex min-w-[900px] items-center justify-between md:min-w-0">
            <div className="absolute left-0 right-0 top-8 h-[1.5px] bg-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute left-0 right-0 top-8 h-[1.5px] bg-gradient-to-r from-cyan-400/60 via-blue-400/60 to-cyan-300"
            />
            {nodes.map((n, i) => (
              <FlowNode key={n.label} {...n} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 8 — IA TRABAJANDO
   ============================================================ */

function AIAssistantCard({ name, icon: Icon, color, message, metric, metricLabel, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -5 }}
      className="flex flex-col rounded-2xl border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(10,22,40,0.12)]"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}14` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <span className="text-[14.5px] font-medium text-[#0A1628]">{name}</span>
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: "rgba(10,22,40,0.03)" }}>
        <p className="text-[13px] leading-relaxed text-[#475569]">{message}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: COLORS.border }}>
        <span className="text-[12px] text-[#94A3B8]">{metricLabel}</span>
        <span className="text-[15px] font-semibold" style={{ color }}>{metric}</span>
      </div>
    </motion.div>
  );
}

function AIWorking() {
  const assistants = [
    {
      name: "IA comercial",
      icon: ShoppingCart,
      color: "#2563EB",
      message: "Detecté 14 clientes con probabilidad alta de recompra esta semana. Generé el seguimiento automático.",
      metric: "+22%",
      metricLabel: "Conversión",
    },
    {
      name: "IA financiera",
      icon: DollarSign,
      color: "#16A34A",
      message: "El flujo de caja proyectado para abril muestra un excedente. Sugiero adelantar el pago a proveedores clave.",
      metric: "$48.2k",
      metricLabel: "Excedente proyectado",
    },
    {
      name: "IA administrativa",
      icon: FileText,
      color: "#D97706",
      message: "Concilié 312 comprobantes automáticamente. Quedan 4 casos que requieren tu revisión manual.",
      metric: "98.7%",
      metricLabel: "Conciliación automática",
    },
    {
      name: "IA marketing",
      icon: Megaphone,
      color: "#DB2777",
      message: "La campaña de reactivación generó 3.4x más respuestas que el promedio histórico. Recomiendo escalar el presupuesto.",
      metric: "3.4x",
      metricLabel: "Sobre el promedio",
    },
    {
      name: "IA gerencial",
      icon: Brain,
      color: "#7C3AED",
      message: "Identifiqué un cuello de botella en producción que está costando 6 horas semanales. Preparé el plan de corrección.",
      metric: "6 hs",
      metricLabel: "Ahorro semanal estimado",
    },
  ];
  return (
    <Section className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow>Inteligencia aplicada</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight sm:text-[2.5rem]">
            IA trabajando, todos los días
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-5 text-[15.5px] text-[#64748B]">
            Cinco asistentes especializados, integrados a tu operación real.
          </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assistants.map((a, i) => (
            <div key={a.name} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <AIAssistantCard {...a} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 9 — DASHBOARD COMPLETO (30+ widgets)
   ============================================================ */

function MicroStat({ label, value, delta, up = true, icon: Icon }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] text-white/40">{label}</span>
        <Icon className="h-3 w-3 text-white/30" />
      </div>
      <div className="mt-1.5 text-[17px] font-semibold text-white">{value}</div>
      <div className={`mt-0.5 flex items-center gap-1 text-[10.5px] ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
        {delta}
      </div>
    </div>
  );
}

function MiniBarsGrid() {
  const vals = [40, 65, 50, 80, 60, 95, 75, 55, 70, 85, 62, 90];
  return (
    <div className="flex h-12 items-end gap-1">
      {vals.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.03 }}
          className="flex-1 rounded-[2px]"
          style={{ background: "linear-gradient(to top, rgba(37,99,235,0.4), rgba(34,211,238,0.7))" }}
        />
      ))}
    </div>
  );
}

function FullDashboard() {
  return (
    <motion.div
      {...scaleIn(0.1)}
      className="rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7"
      style={{ backgroundColor: "rgba(13,26,46,0.85)" }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
            <LineChart className="h-4 w-4 text-cyan-300" />
          </div>
          <span className="text-[13.5px] font-medium text-white">Empresa inteligente — panel general</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-white/30" />
          <span className="text-[11.5px] text-white/40">Junio 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <MicroStat label="Ventas" value="$284k" delta="18.2%" icon={DollarSign} />
        <MicroStat label="Compras" value="$96k" delta="4.1%" icon={ShoppingCart} up={false} />
        <MicroStat label="Rentabilidad" value="34%" delta="6.4%" icon={TrendingUp} />
        <MicroStat label="Stock" value="1,842u" delta="2.3%" icon={Boxes} />
        <MicroStat label="Clientes activos" value="612" delta="11%" icon={Users} />
        <MicroStat label="Tickets abiertos" value="9" delta="3" icon={HeadphonesIcon} up={false} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12px] font-medium text-white/50">Ventas por mes</span>
            <span className="text-[11px] text-white/30">12m</span>
          </div>
          <MiniBarsGrid />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-[12px] font-medium text-white/50">Eficiencia operativa</span>
          <div className="mt-2 flex items-center justify-center">
            <RadialGaugeWhite value={92} />
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-[12px] font-medium text-white/50">Flujo de caja</span>
          <MiniSparkline />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-[12px] font-medium text-white/50">Predicción de demanda</div>
          <div className="space-y-2">
            {["Producto A", "Producto B", "Producto C"].map((p, i) => (
              <div key={p} className="flex items-center justify-between">
                <span className="text-[11.5px] text-white/60">{p}</span>
                <span className="text-[11.5px] font-medium text-cyan-300">+{12 + i * 6}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-[12px] font-medium text-white/50">Próximos vencimientos</div>
          <div className="space-y-2">
            {[["Proveedor logístico", "12 jul"], ["Impuestos", "18 jul"], ["Alquiler depósito", "25 jul"]].map(([n, d]) => (
              <div key={n} className="flex items-center justify-between">
                <span className="text-[11.5px] text-white/60">{n}</span>
                <span className="text-[11px] text-white/30">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl px-4 py-3" style={{ border: "1px solid rgba(251,191,36,0.15)", backgroundColor: "rgba(251,191,36,0.06)" }}>
        <div className="flex items-center gap-2">
          <Bell className="h-3.5 w-3.5 text-amber-300" />
          <span className="text-[12px] text-amber-100/90">5 alertas requieren atención: 3 stock, 2 vencimientos</span>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-amber-300/60" />
      </div>
    </motion.div>
  );
}

function DashboardSection() {
  return (
    <Section dark className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow dark>Una sola plataforma</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold tracking-tight text-white sm:text-[2.5rem]">
            Toda tu empresa, en un panel
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-5 text-[15.5px] text-white/50">
            KPIs, ventas, stock, predicciones y alertas, conectados en tiempo real.
          </motion.p>
        </div>
        <div className="mt-16">
          <FullDashboard />
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   SECTION 10 — NUESTRA VISIÓN (EVOLUCIÓN MODULAR)
   ============================================================ */

function EvolutionStage({ label, icon: Icon, active, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2 rounded-full border px-4 py-2"
      style={{
        borderColor: active ? "rgba(37,99,235,0.3)" : "rgba(10,22,40,0.08)",
        backgroundColor: active ? "rgba(37,99,235,0.08)" : "#FFFFFF",
      }}
    >
      <Icon className={`h-3.5 w-3.5 ${active ? "text-[#2563EB]" : "text-[#94A3B8]"}`} />
      <span className={`text-[12.5px] font-medium ${active ? "text-[#2563EB]" : "text-[#64748B]"}`}>{label}</span>
    </motion.div>
  );
}

function VisionEvolution() {
  const modules = [
    { label: "Stock", icon: Boxes },
    { label: "CRM", icon: Users },
    { label: "Compras", icon: Truck },
    { label: "Producción", icon: Settings },
    { label: "Facturación", icon: FileText },
    { label: "Marketing", icon: Megaphone },
    { label: "RRHH", icon: Users },
    { label: "IA", icon: Brain },
  ];
  return (
    <Section className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <Eyebrow>Nuestra visión</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="mt-6 text-[2.1rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem]">
            Empezás con un módulo.
            <br />
            <span className="text-[#64748B]">Terminás con una empresa inteligente.</span>
          </motion.h2>
        </div>

        <div className="relative mt-20 flex flex-col items-center">
          <motion.div
            {...fadeUp(0.15)}
            className="mb-10 flex items-center gap-3 rounded-2xl border-2 px-6 py-4"
            style={{ borderColor: "rgba(37,99,235,0.25)", backgroundColor: "rgba(37,99,235,0.04)" }}
          >
            <Boxes className="h-5 w-5 text-[#2563EB]" />
            <span className="text-[14px] font-medium text-[#0A1628]">Empieza resolviendo: gestión de stock</span>
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-px"
            style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.4), transparent)" }}
          />

          <div className="flex max-w-xl flex-wrap items-center justify-center gap-3">
            {modules.map((m, i) => (
              <EvolutionStage key={m.label} {...m} active={i < 3} delay={0.2 + i * 0.07} />
            ))}
          </div>

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-px"
            style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.4), transparent)" }}
          />

          <motion.div
            {...scaleIn(0.9)}
            className="flex items-center gap-3 rounded-2xl border-2 px-7 py-5 shadow-xl"
            style={{ borderColor: "rgba(10,22,40,0.15)", backgroundColor: "#0A1628" }}
          >
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <span className="text-[14.5px] font-medium text-white">Una única plataforma inteligente</span>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   CTA FINAL
   ============================================================ */

function FinalCTA({ onCta }) {
  return (
    <Section dark className="overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)" }}
        />
      </div>
      <Container className="relative z-10 text-center">
        <motion.h2 {...fadeUp(0)} className="mx-auto max-w-3xl text-[2.4rem] font-semibold leading-tight tracking-tight text-white sm:text-[3rem]">
          No implementamos software.
          <br />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Construimos la próxima versión de tu empresa.
          </span>
        </motion.h2>
        <motion.div {...fadeUp(0.2)} className="mt-10 flex justify-center">
          <PrimaryButton onClick={onCta}>Solicitar una auditoría</PrimaryButton>
        </motion.div>
      </Container>
    </Section>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar({ onCta }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Metodología", "Casos", "Plataforma", "IA"];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 backdrop-blur-xl" : ""
      }`}
      style={{ backgroundColor: scrolled ? "rgba(7,13,24,0.85)" : "transparent" }}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8">
            <img src="/pit-logo-white.png" alt="PIT" className="absolute inset-0 h-full w-full object-contain" />
          </div>
          <span className="text-[15px] font-semibold text-white">PIT</span>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="text-[13.5px] text-white/50 transition-colors hover:text-white">
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PrimaryButton onClick={onCta} className="px-5 py-2.5 text-[13.5px]">
            Solicitar auditoría
          </PrimaryButton>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
            style={{ backgroundColor: "#070D18" }}
          >
            <Container className="flex flex-col gap-4 py-6">
              {links.map((l) => (
                <a key={l} href="#" className="text-[14px] text-white/70">{l}</a>
              ))}
              <PrimaryButton onClick={onCta} className="mt-2 w-full justify-center">
                Solicitar auditoría
              </PrimaryButton>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#070D18" }}>
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <img src="/pit-logo-white.png" alt="PIT" className="absolute inset-0 h-full w-full object-contain" />
            </div>
            <span className="text-[14px] font-medium text-white">PIT</span>
            <span className="text-[12.5px] text-white/30">— transformación digital empresarial</span>
          </div>
          <span className="text-[12.5px] text-white/30">© 2026 PIT. Todos los derechos reservados.</span>
        </div>
      </Container>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */

export default function LandingPage() {
  const handleCta = () => {
    document.getElementById("contact-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar onCta={handleCta} />
      <Hero onCta={handleCta} />
      <ChaosToOrder />
      <FamiliarPains />
      <Methodology />
      <DigitalAudit />
      <UseCases />
      <AutomationFlow />
      <AIWorking />
      <DashboardSection />
      <VisionEvolution />
      <div id="contact-anchor" />
      <FinalCTA onCta={handleCta} />
      <Footer />
    </div>
  );
}
