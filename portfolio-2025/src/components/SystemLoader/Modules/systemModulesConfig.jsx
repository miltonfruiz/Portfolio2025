import {
  FaShieldAlt,
  FaBolt,
  FaMemory,
  FaNetworkWired,
  FaDatabase,
  FaMicrochip,
} from "react-icons/fa";

export const systemModules = [
  {
    icon: <FaShieldAlt />,
    label: "SECURITY",
    color: "text-green-500",
    messages: [
      "Loading security protocols...",
      "Encrypting data channels...",
      "Activating firewalls...",
      "Security systems online",
    ],
  },
  {
    icon: <FaBolt />,
    label: "POWER",
    color: "text-yellow-500",
    messages: [
      "Initializing power systems...",
      "Calibrating energy flow...",
      "Stabilizing reactors...",
      "Power systems nominal",
    ],
  },
  {
    icon: <FaMemory />,
    label: "MEMORY",
    color: "text-blue-500",
    messages: [
      "Allocating memory...",
      "Optimizing neural cache...",
      "Testing RAM modules...",
      "Memory systems ready",
    ],
  },
  {
    icon: <FaNetworkWired />,
    label: "NETWORK",
    color: "text-purple-500",
    messages: [
      "Establishing connections...",
      "Synchronizing nodes...",
      "Testing bandwidth...",
      "Network operational",
    ],
  },
  {
    icon: <FaDatabase />,
    label: "DATABASE",
    color: "text-cyan-500",
    messages: [
      "Accessing data banks...",
      "Verifying integrity...",
      "Indexing records...",
      "Databases connected",
    ],
  },
  {
    icon: <FaMicrochip />,
    label: "PROCESSOR",
    color: "text-green-100",
    messages: [
      "Booting processors...",
      "Calibrating cores...",
      "Testing calculations...",
      "CPU online",
    ],
  },
];
