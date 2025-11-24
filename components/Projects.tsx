'use client';

import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
	{
		title: 'TimeToTrain – Gym Website',
		description:
			'Developed a responsive static website using HTML and CSS ensuring clean structure and cross-device compatibility.',
		tech: ['HTML', 'CSS', 'Responsive Design'],
		image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
		title: 'Gmail Reply Assistant',
		description:
			'Implemented Python-Flask workflow for automated email response generation and Gmail API integration. Built basic RAG pipelines for document-driven query handling.',
		tech: ['Python', 'Flask', 'Gmail API', 'RAG'],
		image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
		title: 'OnePlace Insurance Website',
		description:
			'Contributed to module planning and validation logic for Mortgage Insurance workflows. Developed responsive interfaces using HTML, CSS, and JavaScript.',
		tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Spring Boot', 'MySQL'],
		image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
		title: 'Malware Detection in Documents',
		description:
			'Developing a malware classification system using machine learning with SMOTE for dataset balancing. Designing end-to-end detection process with focus on performance.',
		tech: ['Python', 'Machine Learning', 'SMOTE', 'Data Processing'],
		image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
];

export default function Projects() {
	const [isVisible, setIsVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const sectionRef = useRef<HTMLDivElement>(null);

	// Create infinite array by duplicating projects
	const infiniteProjects = [...projects, ...projects, ...projects];
	const startIndex = projects.length; // Start from middle set

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	// Auto-scroll functionality
	useEffect(() => {
		const interval = setInterval(() => {
			nextProject();
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Initialize with middle set
	useEffect(() => {
		setCurrentIndex(startIndex);
	}, []);

	const nextProject = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => {
			const next = prev + 1;
			// Reset to middle when reaching end
			if (next >= infiniteProjects.length - projects.length) {
				setTimeout(() => {
					setCurrentIndex(startIndex);
					setIsTransitioning(false);
				}, 500);
				return next;
			}
			setTimeout(() => setIsTransitioning(false), 500);
			return next;
		});
	};

	const prevProject = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => {
			const next = prev - 1;
			// Reset to middle when reaching start
			if (next < projects.length) {
				setTimeout(() => {
					setCurrentIndex(startIndex + projects.length - 1);
					setIsTransitioning(false);
				}, 500);
				return next;
			}
			setTimeout(() => setIsTransitioning(false), 500);
			return next;
		});
	};

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-20 relative overflow-hidden"
			style={{
				background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), #0a0a0a`,
			}}
		>
			{/* Background gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-purple-950/20 to-[#0a0a0a]"></div>
			
			{/* Background animated elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="max-w-7xl mx-auto px-6 w-full relative z-10">
				<div
					className={`text-center mb-16 transition-all duration-1000 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
				>
					<h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
						PROJECTS
					</h2>
					<p className="text-center text-gray-200 italic text-xl mb-16">
						"A collection of projects that showcase my development journey"
					</p>
				</div>

				<div
					className={`transition-all duration-1000 delay-300 ${
						isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
					}`}
				>
					<div className="relative overflow-hidden">
						<div className="flex overflow-hidden rounded-2xl">
							<div
								className={`flex transition-transform duration-500 ease-out ${
									!isTransitioning ? 'transition-none' : ''
								}`}
								style={{
									transform: `translateX(-${currentIndex * 100}%)`,
									width: `${infiniteProjects.length * 100}%`,
								}}
							>
								{infiniteProjects.map((project, index) => (
									<div key={`${project.title}-${index}`} className="w-full flex-shrink-0 p-2">
										<div className="bg-[#1a1a1a] rounded-2xl transform transition-all duration-300 hover:scale-[1.02] border-2 border-[#8b5cf6] min-h-[400px] relative group
											shadow-[0_0_20px_rgba(139,92,246,0.3)] 
											hover:shadow-[0_0_30px_rgba(139,92,246,0.6),0_0_60px_rgba(139,92,246,0.4)] 
											hover:border-[#a855f7]
											transition-all duration-500">
											<div className="grid lg:grid-cols-2 gap-6 p-6 h-full">
												<div className="space-y-6 transform transition-all duration-500 flex flex-col justify-between">
													<div>
														<div className="transform transition-all duration-300 hover:translate-x-2">
															<h3 className="text-3xl font-bold text-white mb-4 transition-colors duration-300">
																{project.title}
															</h3>
															<p className="text-gray-300 leading-relaxed transition-colors duration-300 hover:text-white">
																{project.description}
															</p>
														</div>

														<div className="flex flex-wrap gap-2 transition-all duration-300 mt-4">
															{project.tech.map((tech, techIndex) => (
																<span
																	key={techIndex}
																	className="px-3 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full text-sm font-medium transform transition-all duration-300 hover:bg-[#8b5cf6]/30 hover:scale-110 hover:rotate-2"
																>
																	{tech}
																</span>
															))}
														</div>
													</div>

													<div className="flex gap-4 pt-4">
														<a
															href={project.github}
															className="group flex items-center gap-2 px-6 py-3 bg-[#8b5cf6] text-white rounded-lg transition-all duration-300 transform hover:bg-[#7c3aed] hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/40"
														>
															<Github className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
															GitHub
														</a>
														<a
															href={project.demo}
															className="group flex items-center gap-2 px-6 py-3 border-2 border-[#8b5cf6] text-[#8b5cf6] rounded-lg transition-all duration-300 transform hover:bg-[#8b5cf6] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/40"
														>
															<ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
															Live Demo
														</a>
													</div>
												</div>

												<div className="relative transform transition-all duration-500 hover:scale-105 flex items-center">
													<div className="aspect-video rounded-lg overflow-hidden relative group w-full">
														<img
															src={project.image}
															alt={project.title}
															className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
														/>
														<div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Navigation Buttons at Bottom */}
						<div className="flex justify-center mt-8 gap-4">
							<button
								onClick={prevProject}
								disabled={isTransitioning}
								className="w-12 h-12 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:bg-[#7c3aed] hover:scale-110 hover:shadow-lg hover:shadow-[#8b5cf6]/30 active:scale-95 disabled:opacity-50"
							>
								<ChevronLeft className="w-6 h-6 transition-transform duration-300 hover:-translate-x-0.5" />
							</button>

							<button
								onClick={nextProject}
								disabled={isTransitioning}
								className="w-12 h-12 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:bg-[#7c3aed] hover:scale-110 hover:shadow-lg hover:shadow-[#8b5cf6]/30 active:scale-95 disabled:opacity-50"
							>
								<ChevronRight className="w-6 h-6 transition-transform duration-300 hover:translate-x-0.5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
