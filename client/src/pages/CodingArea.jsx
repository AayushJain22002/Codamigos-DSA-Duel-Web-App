import React, { useEffect, useRef, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable"
import Editor from '@monaco-editor/react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"
import { Button } from '../../components/ui/button'
import { BsChatRightTextFill } from "react-icons/bs";
import { Input } from '../../components/ui/input'
import { DoorOpen, Link, RotateCcw, Send, Terminal } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../components/ui/tooltip"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Separator } from '../../components/ui/separator'
import { Badge } from '../../components/ui/badge'
import { dataset } from '../data/problems';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'


const CodingArea = () => {

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
    ];
    const code = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const prob = dataset[0]
    const [editorCode, setEditorCode] = useState(
        prob.starterCode[selectedLanguage]
    );
    useEffect(() => {
        setEditorCode(prob.starterCode[selectedLanguage]);
    }, [selectedLanguage]);

    function handleEditorChange(value) {
        setStarterCode(value || "");
    }
    const testcases = [prob.tests[0], prob.tests[1], prob.tests[2]]

    const editorOptions = {
        minimap: {
            enabled: false, // Disables the minimap
        },
        fontSize: 14,
        wordWrap: 'on',      // Wraps long lines
        readOnly: false,   // Makes the editor read-only
        selectOnLineNumbers: true, // Selects the whole line when clicking line number
        automaticLayout: true,
        scrollBeyondLastLine: false,
        glyphMargin: false,
    };
    return (
        <div className='h-screen'>
            <ResizablePanelGroup direction="horizontal"
                className="w-full h-full">
                <ResizablePanel defaultSize={40} minSize={25} maxSize={45}>
                    <ResizablePanelGroup direction="vertical"
                        className="w-full h-full">
                        <ResizablePanel defaultSize={80} minSize={60}>
                            <ScrollArea className="w-full h-full px-2 bg-accent/20">
                                <div>
                                    <div className='p-4 flex flex-col gap-3'>
                                        <div className='flex justify-between'>
                                            <h1 className='font-bold text-2xl'>{prob.title}</h1>
                                            <Badge variant={prob.difficulty} >{prob.difficulty}</Badge>
                                        </div>
                                        <div>
                                            {prob.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="capitalize text-xs">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className='p-2'>
                                        <h1 className='text-md italic font-semibold text-lg'>Description</h1>
                                        <p className='mt-3 text-justify'>{prob.statement}</p>
                                    </div>
                                    <Separator />
                                    <div className='p-2'>
                                        <h1 className='text-md italic font-semibold text-lg '>Examples</h1>
                                        <div className='flex flex-col gap-3'>
                                            {prob.samples.map((sample, index) => (
                                                <div key={index} className='flex items-center px-3'>
                                                    <div className='border border-yellow-400/80 h-10 max-w-0.5' />
                                                    <div key={index} className='flex flex-col px-4'>
                                                        <p>Input:<span className='text-muted-foreground'> {sample.input}</span></p>
                                                        <p>Output:<span className='text-muted-foreground'> {sample.output}</span></p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className='p-2'>
                                        <h1 className='text-md italic font-semibold text-lg '>Constraints</h1>
                                        {prob.constraints.map((c) => (
                                            <p className='my-1'>{c}</p>
                                        ))}
                                    </div>
                                </div>

                            </ScrollArea>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} minSize={25}>
                            Questions
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75} minSize={25}>
                    <ResizablePanelGroup direction="vertical">
                        <Select
                            value={selectedLanguage}
                            onValueChange={(newValue) => setSelectedLanguage(newValue)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>

                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <ResizablePanel defaultSize={75}>
                            <Editor
                                height="90vh"
                                language={selectedLanguage}
                                value={editorCode}
                                theme="vs-dark"
                                options={editorOptions}
                                onChange={handleEditorChange}
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={45} minSize={20} maxSize={50} className="flex flex-col h-full">

                            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/20">
                                <h1 className="font-semibold text-sm">Test Cases</h1>
                                <Badge variant="outline" className="text-xs">{testcases.length} Cases</Badge>
                            </div>

                            <div className="flex-1 p-2 overflow-hidden bg-muted/10">
                                <Carousel className="w-full h-full" opts={{ align: "start" }}>
                                    <CarouselContent>
                                        {testcases.map((test, index) => (
                                            <CarouselItem key={index}>
                                                <div className="h-full">
                                                    <Card className="h-full border-muted bg-card shadow-sm flex flex-col">
                                                        {/* Header with Integrated Navigation */}
                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-muted/50 px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <Terminal className="h-4 w-4 text-muted-foreground" />
                                                                <CardTitle className="text-sm font-medium">Case {index + 1}</CardTitle>
                                                            </div>

                                                            <div className="flex gap-1">
                                                                {/* Visual indicators or mini-status badges */}
                                                                <div className="h-2 w-2 rounded-full bg-green-500/50" />
                                                                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                                                            </div>
                                                        </CardHeader>

                                                        <CardContent className="space-y-4 pt-4 flex-1 overflow-hidden">

                                                            {/* INPUT - Scrollable Area */}
                                                            <div className="space-y-1.5">
                                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                                                    Input
                                                                </span>
                                                                <div className="relative rounded-md bg-slate-950 text-slate-50 font-mono text-xs shadow-inner border border-slate-800">
                                                                    {/* max-h-24 ensures it doesn't blow out the panel height */}
                                                                    <div className="max-h-24 overflow-y-auto p-3 custom-scrollbar">
                                                                        <pre className="whitespace-pre-wrap break-all">
                                                                            {test.input}
                                                                        </pre>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* OUTPUT - Scrollable Area */}
                                                            <div className="space-y-1.5">
                                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                                                    Expected Output
                                                                </span>
                                                                <div className="rounded-md bg-muted/50 border border-border font-mono text-xs text-primary shadow-sm">
                                                                    {/* max-h-24 ensures it doesn't blow out the panel height */}
                                                                    <div className="max-h-24 overflow-y-auto p-3 custom-scrollbar">
                                                                        <pre className="whitespace-pre-wrap break-all">
                                                                            {test.output}
                                                                        </pre>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>


                                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 z-10 bg-background/80 backdrop-blur-sm border-muted" />
                                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 z-10 bg-background/80 backdrop-blur-sm border-muted" />
                                </Carousel>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={20} minSize={10} maxSize={20}>
                    <div className="flex min-h-full flex-col items-center gap-2 justify-between p-4">
                        <div className='w-full'>
                            <div className='flex gap-2 text-yellow-400 font-bold items-center bg-accent border p-1 justify-center rounded-2xl mb-2'>
                                <Link size={18} />{code}
                            </div>
                            <div>
                                Timer: 00:52
                            </div>
                            <Separator className="w-full my-3" />
                            <div className='flex flex-col w-full gap-2'>
                                <Button>player 1</Button>
                                <Button>player 2</Button>
                            </div>
                            <Separator className="w-full my-3" />
                            <div className='flex *:flex-1 w-full gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline"><RotateCcw /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Rematch?</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline"><DoorOpen /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Leave</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                        </div>
                        <div className='fixed bottom-5 right-5 gap-2 z-5'>
                            <Sheet>
                                <SheetTrigger>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className='border p-3 bg-accent text-accent-foreground rounded-full'><BsChatRightTextFill /></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Chat</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SheetTrigger>
                                <SheetContent className="p-5">
                                    <SheetTitle>Chat With Your Rival</SheetTitle>
                                    <SheetFooter className="flex flex-row">
                                        <Input placeholder="Type Here..." />
                                        <Button className="cursor-pointer"><Send /></Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default CodingArea