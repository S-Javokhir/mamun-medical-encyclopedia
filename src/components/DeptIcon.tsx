import { 
  Activity, 
  Baby, 
  Bone, 
  Brain, 
  Heart, 
  ScanLine, 
  Dna, 
  Microscope,
  type LucideIcon 
} from "lucide-react";

const map: Record<string, LucideIcon> = { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  Activity, 
  ScanLine,
  Dna,
  Microscope
};

export function DeptIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Heart;
  return <Icon className={className} />;
}
