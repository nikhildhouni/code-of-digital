'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo,
    Image as ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TipTapEditorProps {
    content: string | null
    onChange: (content: string) => void
    editable?: boolean // To disable editing if needed
}

export function TipTapEditor({ content, onChange, editable = true }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content || '',
        editable,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] w-full max-w-none p-4'
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })

    // useEffect to update content if it changes externally? 
    // Usually this causes loops. We will rely on initial content.

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md overflow-hidden bg-background">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/40">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(editor.isActive('bold') && 'bg-muted text-primary')}
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(editor.isActive('italic') && 'bg-muted text-primary')}
                >
                    <Italic className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(editor.isActive('heading', { level: 1 }) && 'bg-muted text-primary')}
                >
                    <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(editor.isActive('heading', { level: 2 }) && 'bg-muted text-primary')}
                >
                    <Heading2 className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(editor.isActive('bulletList') && 'bg-muted text-primary')}
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(editor.isActive('orderedList') && 'bg-muted text-primary')}
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(editor.isActive('blockquote') && 'bg-muted text-primary')}
                >
                    <Quote className="w-4 h-4" />
                </Button>
                <div className="flex-1" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo className="w-4 h-4" />
                </Button>
            </div>

            {/* Content */}
            <EditorContent editor={editor} />
        </div>
    )
}
