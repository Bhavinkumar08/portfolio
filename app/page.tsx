'use client'

import { Github, Linkedin, Mail, BotIcon as Robot, Code, Brain, Terminal, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Providers } from '@/components/providers'

const P5Animation = dynamic(() => import('@/components/P5Animation'), { ssr: false })

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const [changeAnimation, setChangeAnimation] = useState(0);

  return (
    <Providers>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Hero Section */}
        <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
          <div className="absolute inset-0">
            <P5Animation changeAnimation={changeAnimation} />
          </div>
          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10 container px-4 mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative inline-block"
            >
              <motion.h1 
                className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/75 to-primary"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                BHAVIN
              </motion.h1>
              <motion.h1 
                className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/75 to-primary"
                animate={{ 
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                KUMAR
              </motion.h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground mb-8"
            >
              <Robot className="w-6 h-6" />
              <span className="font-mono">Robotics & AI Engineer</span>
            </motion.div>
            <motion.div 
              className="flex justify-center gap-4"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeIn}>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="#contact">
                    Get in Touch
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button  asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="https://github.com/Bhavinkumar08" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button
                  onClick={() => setChangeAnimation(prev => prev + 1)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Change Animation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section 
          className="py-20" 
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">About Me</h2>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground">
              <motion.p 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                I am a passionate Robotics and AI Engineer with expertise in developing intelligent systems and autonomous solutions. My work focuses on combining robotics with artificial intelligence to create innovative solutions for real-world problems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                With a strong foundation in both hardware and software, I specialize in robotics control systems, computer vision, and machine learning applications.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">Skills & Expertise</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn}>
                <Card className="hover:shadow-lg transition-shadow bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <motion.div
                      animate={{  scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Robot className="w-12 h-12 mb-2 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">Robotics</CardTitle>
                    <CardDescription>Control Systems & Hardware Integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Robot Operating System (ROS)</li>
                      <li>Sensor Integration</li>
                      <li>Motion Planning</li>
                      <li>Control Systems</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="hover:shadow-lg transition-shadow bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Brain className="w-12 h-12 mb-2 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">Artificial Intelligence</CardTitle>
                    <CardDescription>Machine Learning & Computer Vision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Deep Learning</li>
                      <li>Computer Vision</li>
                      <li>Neural Networks</li>
                      <li>TensorFlow & PyTorch</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="hover:shadow-lg transition-shadow bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <motion.div
                      animate={{  scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Code className="w-12 h-12 mb-2 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">Programming</CardTitle>
                    <CardDescription>Languages & Tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Python</li>
                      <li>C++</li>
                      <li>MATLAB</li>
                      <li>Git & Version Control</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20" id="projects">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">Featured Projects</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn}>
                <Card className="group hover:shadow-lg transition-all bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Terminal className="w-8 h-8 text-primary" />
                      AI Recycle Bin
                    </CardTitle>
                    <CardDescription>Smart Waste Management System</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      An intelligent waste management system using computer vision for automatic waste classification and sorting.
                    </p>
                    <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href="https://github.com/Bhavinkumar08/AI_Recycle_Bin_Xiao" target="_blank">
                        View Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="group hover:shadow-lg transition-all bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Terminal className="w-8 h-8 text-primary" />
                      Interactive Game Development
                    </CardTitle>
                    <CardDescription>Web-based Interactive Applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Development of interactive web-based games and applications showcasing UI/UX skills and game logic implementation.
                    </p>
                    <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href="https://github.com/Bhavinkumar08/Catch-the-Circle" target="_blank">
                        View Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          className="py-20" 
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">Get in Touch</h2>
            <div className="max-w-md mx-auto">
              <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                <CardContent className="pt-6">
                  <motion.div 
                    className="space-y-4"
                    variants={staggerChildren}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={fadeIn}>
                      <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform hover:bg-primary hover:text-primary-foreground" asChild>
                        <Link href="https://github.com/Bhavinkumar08" target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform hover:bg-primary hover:text-primary-foreground" asChild>
                        <Link href="https://linkedin.com" target="_blank">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform hover:bg-primary hover:text-primary-foreground" asChild>
                        <Link href="mailto:contact@example.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bhavin Kumar. All rights reserved.</p>
        </footer>
      </div>
    </Providers>
  )
}

