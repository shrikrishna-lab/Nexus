import { BarChart, Bar, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Clock, Flame, Play, Plus, Target } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { progressLogs, tasks } from "@/data/seed";

const pie = [
  { name: "Study", value: 19, color: "#7c3aed" },
  { name: "Projects", value: 25.5, color: "#06b6d4" },
  { name: "Fitness", value: 6, color: "#10b981" }
];

export function ProgressPage() {
  const statuses = ["To Do", "In Progress", "Done", "Blocked"] as const;

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 3"
        title="Progress Tracker"
        description="Study heatmaps, project Kanban, habit streaks, time logger, goals, charts, and weekly summaries in one local dashboard."
        actions={<Button variant="primary" onClick={() => toast.success("Timer started for active workspace")}><Play size={16} /> Start Timer</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-4">
        {[
          ["Hours this week", "50.5", Clock],
          ["Current streak", "12 days", Flame],
          ["React goal", "64%", Target],
          ["Tasks completed", "31", Plus]
        ].map(([label, value, Icon]) => (
          <div key={label as string} className="glass rounded-lg p-4">
            <Icon className="text-cyan-200" size={20} />
            <div className="mt-4 text-2xl font-black">{value as string}</div>
            <div className="text-sm text-white/45">{label as string}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <section className="glass rounded-lg p-4">
          <h2 className="mb-4 font-bold">Weekly Activity</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={progressLogs}>
                <XAxis dataKey="day" stroke="rgba(255,255,255,.35)" />
                <Tooltip contentStyle={{ background: "#111118", border: "1px solid rgba(255,255,255,.12)" }} />
                <Bar dataKey="study" stackId="a" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="projects" stackId="a" fill="#06b6d4" />
                <Bar dataKey="fitness" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="mb-4 font-bold">Category Breakdown</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92}>
                  {pie.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#111118", border: "1px solid rgba(255,255,255,.12)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-4">
        {statuses.map((status) => (
          <section key={status} className="glass min-h-64 rounded-lg p-3">
            <h3 className="mb-3 text-sm font-semibold text-white/70">{status}</h3>
            <div className="space-y-3">
              {tasks.filter((task) => task.status === status).map((task) => (
                <article key={task.id} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-sm font-medium">{task.title}</div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/42">
                    <span>{task.priority}</span>
                    <span>{task.dueDate || "Recurring"}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
