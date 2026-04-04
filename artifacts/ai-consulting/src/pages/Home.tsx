import { useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Brain, Factory, Briefcase, HeartPulse, ShieldCheck, CheckCircle2, TrendingUp, BarChart3, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const industryValues = ["healthcare", "finance", "insurance", "manufacturing", "other"] as const;

// Form Schema matching the API
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  industry: z.enum(industryValues, { required_error: "Please select an industry" }),
  message: z.string().min(10, "Please provide more details about your needs"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Home() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const formRef = useRef<HTMLDivElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      industry: undefined,
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Inquiry Submitted",
            description: "Thank you for reaching out. I'll be in touch shortly.",
            variant: "default",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Submission Failed",
            description: "There was an error submitting your inquiry. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const scrollToContact = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold font-display text-lg">
              T
            </div>
            <span className="font-display font-bold text-xl tracking-tight leading-tight">The Agile Ai<br /><span className="text-primary">Company Inc.</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#value" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Value</a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#sectors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sectors</a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Process</a>
          </nav>
          <Button onClick={scrollToContact} className="font-medium tracking-wide">
            Book Discovery Call
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 lg:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Abstract AI Technology Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-1.5 text-sm">
              AI Consulting for Small & Mid-Size Businesses
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] tracking-tight mb-8">
              Turn AI hype into <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">measurable business value.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Specialized AI consulting for Healthcare, Finance, Insurance, and Manufacturing businesses ready to implement artificial intelligence securely, profitably, and without the complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToContact} className="text-base h-14 px-8 font-semibold">
                Start Your Transformation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 border-border hover:bg-secondary">
                Explore Industry Use Cases
              </Button>
            </div>
            
            <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>ROI-focused deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Vendor-agnostic strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="value" className="py-24 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Why SMBs need a dedicated AI consultant — not just a tool.</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The gap between businesses using AI strategically and those who aren't is widening every week. But adopting random AI tools without a clear strategy is a security risk and a waste of capital.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                As an AI consultant specializing in small and mid-size businesses, I bridge the gap between complex machine learning models and your bottom line. No jargon, no science projects. Just pragmatic AI implementation that drives revenue, cuts costs, and empowers your workforce — whether you're in healthcare, finance, insurance, or manufacturing.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><TrendingUp className="h-4 w-4 text-primary" /></div>
                  <span className="text-foreground">Identify high-ROI automation opportunities hidden in your workflows.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><ShieldCheck className="h-4 w-4 text-primary" /></div>
                  <span className="text-foreground">Navigate compliance, data privacy, and governance securely.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full"><Users className="h-4 w-4 text-primary" /></div>
                  <span className="text-foreground">Upskill your existing team to work alongside AI, rather than fear it.</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">AVERAGE CLIENT ROI</p>
                    <h3 className="text-4xl font-display font-bold text-foreground">340%</h3>
                  </div>
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Operational Efficiency</span>
                      <span className="text-sm text-primary font-bold">+42%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Time-to-Insight</span>
                      <span className="text-sm text-primary font-bold">10x Faster</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Manual Data Entry</span>
                      <span className="text-sm text-primary font-bold">-75%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[75%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">AI Consulting Tailored to Your Industry</h2>
            <p className="text-lg text-muted-foreground">
              Artificial intelligence is not a one-size-fits-all solution. Our AI consulting approach is designed around the unique regulatory, operational, and competitive realities of your specific sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Healthcare */}
            <Card className="bg-card/50 backdrop-blur border-border overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/sector-healthcare.png" alt="Healthcare AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg"><HeartPulse className="h-6 w-6 text-primary-foreground" /></div>
                  <h3 className="text-2xl font-display font-bold">Healthcare</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Deploy HIPAA-compliant LLMs to synthesize patient records, automate pre-authorizations, and dramatically reduce provider burnout. Transform unstructured clinical notes into actionable insights while maintaining strict data privacy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Clinical NLP</Badge>
                  <Badge variant="secondary">RCM Automation</Badge>
                  <Badge variant="secondary">Patient Triage</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Finance */}
            <Card className="bg-card/50 backdrop-blur border-border overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/sector-finance.png" alt="Finance AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg"><Briefcase className="h-6 w-6 text-primary-foreground" /></div>
                  <h3 className="text-2xl font-display font-bold">Finance & Insurance</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Accelerate risk assessment, automate underwriting workflows, and detect anomalous patterns in real-time. Use generative AI to instantly query complex financial regulations and summarize lengthy contracts or earnings reports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Fraud Detection</Badge>
                  <Badge variant="secondary">Algorithmic Underwriting</Badge>
                  <Badge variant="secondary">Compliance GenAI</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturing */}
            <Card className="bg-card/50 backdrop-blur border-border overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/sector-manufacturing.png" alt="Manufacturing AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg"><Factory className="h-6 w-6 text-primary-foreground" /></div>
                  <h3 className="text-2xl font-display font-bold">Manufacturing</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Move from reactive repairs to predictive maintenance. Implement computer vision for autonomous quality control on the assembly line, and optimize supply chain logistics using predictive demand modeling.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Predictive Maintenance</Badge>
                  <Badge variant="secondary">Computer Vision QA</Badge>
                  <Badge variant="secondary">Supply Chain</Badge>
                </div>
              </CardContent>
            </Card>

            {/* General Industry */}
            <Card className="bg-card/50 backdrop-blur border-border overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/sector-industry.png" alt="General Industry AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg"><Brain className="h-6 w-6 text-primary-foreground" /></div>
                  <h3 className="text-2xl font-display font-bold">Professional Services</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Supercharge your knowledge workers. Build secure, internal knowledge bases that allow your team to instantly query proprietary data, draft reports, and automate routine client communications securely.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Enterprise RAG</Badge>
                  <Badge variant="secondary">Workflow Automation</Badge>
                  <Badge variant="secondary">Client Support AI</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services & Process */}
      <section id="process" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Comprehensive Engagement Model</h2>
            <p className="text-lg text-muted-foreground">From initial discovery to full deployment, I provide end-to-end guidance to ensure your AI initiatives succeed and scale.</p>
          </div>

          <div className="relative">
            {/* Line connecting process steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              <div className="bg-card border border-border p-6 rounded-xl relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">1</div>
                <h4 className="text-xl font-bold mb-3 font-display">Discovery & Audit</h4>
                <p className="text-sm text-muted-foreground">Deep dive into your current workflows, data architecture, and business goals to identify high-feasibility, high-ROI AI use cases.</p>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">2</div>
                <h4 className="text-xl font-bold mb-3 font-display">Strategic Roadmap</h4>
                <p className="text-sm text-muted-foreground">Develop a phased implementation plan detailing required tech stacks, vendor selection, budget, timeline, and risk mitigation strategies.</p>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">3</div>
                <h4 className="text-xl font-bold mb-3 font-display">Pilot Implementation</h4>
                <p className="text-sm text-muted-foreground">Build and deploy a proof-of-concept in a controlled environment to validate the solution, measure initial ROI, and gather user feedback.</p>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">4</div>
                <h4 className="text-xl font-bold mb-3 font-display">Scaling & Training</h4>
                <p className="text-sm text-muted-foreground">Roll out the validated solution enterprise-wide. Conduct comprehensive team training to ensure adoption and establish internal AI governance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative" ref={formRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Ready to build your AI advantage?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Let's discuss your specific challenges and explore how artificial intelligence can create immediate value for your organization.
              </p>
              
              <div className="space-y-6 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center border border-border">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Free 1-Hour Discovery Call</p>
                    <p>We start by listening — understanding your business, your reality, and what you're truly trying to achieve.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur border border-border p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold font-display mb-6">Request a Consultation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} className="bg-background/50" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@company.com" {...field} className="bg-background/50" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 000-0000" {...field} className="bg-background/50" data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry Sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50" data-testid="select-industry">
                                <SelectValue placeholder="Select an industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="insurance">Insurance</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe Your Needs</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your current systems and what you're hoping to achieve with AI..." 
                            className="min-h-[120px] bg-background/50 resize-y" 
                            data-testid="input-message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold" 
                    disabled={submitContact.isPending}
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold font-display text-xs">
                T
              </div>
              <span className="font-display font-bold text-lg tracking-tight leading-tight">The Agile Ai<br /><span className="text-primary">Company Inc.</span></span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} The Agile Ai Company Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
