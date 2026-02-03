import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function MediaPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Media Manager</h1>
                <p className="text-muted-foreground">Upload and manage your images and assets.</p>
            </div>
            <div className="bg-card p-6 rounded-xl border">
                <MediaLibrary />
            </div>
        </div>
    )
}
