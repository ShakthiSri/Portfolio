'use client';

import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
	{
		title: 'TimeToTrain – Gym Website',
		description:
			'Developed a responsive static website using HTML and CSS ensuring clean structure and cross-device compatibility.',
		tags: ['HTML', 'CSS', 'Responsive Design'],
		image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
		title: 'Gmail Reply Assistant',
		description:
			'Implemented Python-Flask workflow for automated email response generation and Gmail API integration. Built basic RAG pipelines for document-driven query handling.',
		tags: ['Python', 'Flask', 'Gmail API', 'RAG'],
		image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
        title: 'Portfolio Website',
        description: 'Interactive 3D portfolio with Spline integration, showcasing modern web development.',
        tags: ['Next.js', 'Spline', 'Tailwind CSS'],
        image: '/portfolio.jpg',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
	  {
        title: 'Travel Planner',
        description: 'Full-stack travel planning application with user authentication, itinerary management, and booking features.',
        tags: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Auth0','API'],
        image: '/travel.jpg',
        demo: 'https://demo.com'
      },
	{
		title: 'OnePlace Insurance Website',
		description:
			'Contributed to module planning and validation logic for Mortgage Insurance workflows. Developed responsive interfaces using HTML, CSS, and JavaScript.',
		tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Spring Boot', 'MySQL'],
		image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
	{
		title: 'Malware Detection in Documents',
		description:
			'Developing a malware classification system using machine learning with SMOTE for dataset balancing. Designing end-to-end detection process with focus on performance.',
		tags: ['Python', 'Machine Learning', 'SMOTE', 'Data Processing'],
		image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
		github: 'https://github.com',
		demo: 'https://demo.com',
	},
];

export default function Projects() {
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [currentProject, setCurrentProject] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [userInteracted, setUserInteracted] = useState(false);
	const [projectsInView, setProjectsInView] = useState(true);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					setProjectsInView(entry.intersectionRatio > 0.3);
				} else {
					setProjectsInView(false);
				}
			},
			{
				threshold: [0, 0.3, 0.7, 1],
				rootMargin: '-10% 0px -10% 0px',
			}
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

	const nextProject = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setUserInteracted(true);
		setCurrentProject((prev) => (prev + 1) % projects.length);
		setTimeout(() => setIsTransitioning(false), 100);
	};

	const prevProject = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setUserInteracted(true);
		setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
		setTimeout(() => setIsTransitioning(false), 100);
	};

	const goToProject = (index: number) => {
		if (isTransitioning || index === currentProject) return;
		setIsTransitioning(true);
		setUserInteracted(true);
		setCurrentProject(index);
		setTimeout(() => setIsTransitioning(false), 100);
	};

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				prevProject();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				nextProject();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [isTransitioning]);

	// Resume auto-movement after user interaction
	useEffect(() => {
		if (!userInteracted) return;

		const resumeTimer = setTimeout(() => {
			setUserInteracted(false);
		}, 5000);

		return () => clearTimeout(resumeTimer);
	}, [userInteracted, currentProject]);

	// Ultra smooth auto-advance with better pause conditions
	useEffect(() => {
		if (isPaused || userInteracted || !projectsInView) return;

		const autoAdvance = setInterval(() => {
			setCurrentProject((prev) => (prev + 1) % projects.length);
		}, 1500);

		return () => clearInterval(autoAdvance);
	}, [isPaused, userInteracted, projectsInView]);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="min-h-screen bg-[#0a0a0a] py-12 sm:py-20 relative overflow-hidden"
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

			<div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
				{/* Heading */}
				<div
					className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
				>
					<h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4">
						FEATURED <span className="text-[#8b5cf6]">PROJECTS</span>
					</h2>
					<p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
						A showcase of my recent work and creative solutions
					</p>
				</div>

				{/* 3D Card Carousel - Infinite Circular */}
				<div
					className="relative h-[500px] sm:h-[600px] flex items-center justify-center perspective-1000"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					tabIndex={0}
				>
					<div className="relative w-full max-w-6xl h-full flex items-center justify-center">
						{projects.map((project, index) => {
							// Ultra smooth position calculation with seamless circular wrapping
							let offset = index - currentProject;

							// Seamless circular wrapping - KEY PART for infinite scroll
							if (offset > projects.length / 2) {
								offset = offset - projects.length;
							} else if (offset < -projects.length / 2) {
								offset = offset + projects.length;
							}

							const absOffset = Math.abs(offset);
							const isActive = index === currentProject;
							const isVisible = absOffset <= 2; // Show more cards to fill gaps

							return (
								<div
									key={index}
									className="absolute top-1/2 left-1/2 cursor-pointer"
									style={{
										transformStyle: 'preserve-3d',
										zIndex: isActive ? 25 : Math.max(1, 20 - absOffset),
										transform: `
											translateX(calc(-50% + ${offset * 300}px))
											translateY(-50%)
											rotateY(${offset * -15}deg)
											rotateX(${absOffset * 2}deg)
											scale(${isActive ? 1 : Math.max(0.65, 1 - absOffset * 0.15)})
										`,
										opacity: isVisible ? (absOffset > 1.5 ? 0.4 : 1) : 0,
										transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
									}}
									onClick={() => goToProject(index)}
								>
									<div
										className="w-[320px] sm:w-[380px] h-[420px] sm:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-gray-800 to-black border-2 border-[#8b5cf6]/20 shadow-2xl relative group"
										style={{
											transform: `rotateY(${offset * 2}deg)`,
											transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
										}}
									>
										{/* Project Image */}
										<div className="absolute inset-0">
											<img
												src={project.image}
												alt={project.title}
												className="w-full h-full object-cover"
												style={{
													filter: isActive ? 'none' : 'brightness(0.7) saturate(0.8)',
													transition: 'filter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
												}}
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23${
														['8b5cf6', 'a855f7', '7c3aed'][index % 3]
													}" width="400" height="500"/%3E%3C/svg%3E`;
												}}
											/>
											<div
												className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20"
												style={{
													opacity: isActive ? 0.7 : 0.9,
													transition: 'opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
												}}
											/>
										</div>

										{/* Project Title */}
										<div className="absolute bottom-6 left-6 right-6 z-20">
											<h3
												className="text-xl sm:text-2xl font-bold text-white mb-2"
												style={{
													transition: 'transform 0.3s ease',
													transform: isActive ? 'translateY(0)' : 'translateY(5px)',
												}}
											>
												{project.title}
											</h3>

											{/* Ultra smooth details transition */}
											<div
												style={{
													opacity: isActive ? 1 : 0,
													transform: `translateY(${isActive ? 0 : 10}px)`,
													transition:
														'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
													height: isActive ? 'auto' : 0,
													overflow: 'hidden',
												}}
											>
												{isActive && (
													<div>
														<p
															className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3"
															style={{
																transition: 'opacity 0.4s ease 0.2s',
																opacity: isActive ? 1 : 0,
															}}
														>
															{project.description}
														</p>

														{/* Tech Stack */}
														<div
															className="flex flex-wrap gap-2 mb-4"
															style={{
																transition: 'opacity 0.4s ease 0.3s',
																opacity: isActive ? 1 : 0,
															}}
														>
															{project.tags.slice(0, 3).map((tech, i) => (
																<span
																	key={tech}
																	className="bg-[#8b5cf6]/20 text-[#8b5cf6] px-2 py-1 rounded text-xs backdrop-blur-sm"
																	style={{
																		transition: `opacity 0.3s ease ${0.4 + i * 0.1}s, transform 0.3s ease ${
																			0.4 + i * 0.1
																		}s`,
																		opacity: isActive ? 1 : 0,
																		transform: `translateY(${isActive ? 0 : 5}px)`,
																	}}
																>
																	{tech}
																</span>
															))}
														</div>

														{/* Action Buttons */}
														<div
															className="flex space-x-3"
															style={{
																transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
																opacity: isActive ? 1 : 0,
																transform: `translateY(${isActive ? 0 : 10}px)`,
															}}
														>
															<a
																href={project.demo}
																target="_blank"
																rel="noopener noreferrer"
																className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2"
																onClick={(e) => e.stopPropagation()}
															>
																<ExternalLink size={16} />
																View
															</a>
															<a
																href={project.github}
																target="_blank"
																rel="noopener noreferrer"
																className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 backdrop-blur-sm"
																onClick={(e) => e.stopPropagation()}
															>
																<Github size={16} />
																Code
															</a>
														</div>
													</div>
												)}
											</div>
										</div>

										{/* Glow effect for active card */}
										<div
											className="absolute inset-0 rounded-2xl border-2 border-[#8b5cf6]/40 shadow-lg shadow-[#8b5cf6]/50 pointer-events-none"
											style={{
												opacity: isActive ? 1 : 0,
												transform: `scale(${isActive ? 1 : 0.98})`,
												transition:
													'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Navigation Controls Below Carousel */}
				<div className="flex justify-center items-center space-x-5 mt-8">
					<button
						onClick={prevProject}
						className="bg-black/50 hover:bg-black/70 text-[#8b5cf6] p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-[#8b5cf6]/30 hover:scale-110 hover:border-[#8b5cf6]/50 hover:shadow-lg hover:shadow-[#8b5cf6]/25"
						title="Previous project (Left arrow key)"
					>
						<ChevronLeft size={24} className="sm:w-7 sm:h-7" />
					</button>

					<button
						onClick={nextProject}
						className="bg-black/50 hover:bg-black/70 text-[#8b5cf6] p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-[#8b5cf6]/30 hover:scale-110 hover:border-[#8b5cf6]/50 hover:shadow-lg hover:shadow-[#8b5cf6]/25"
						title="Next project (Right arrow key)"
					>
						<ChevronRight size={24} className="sm:w-7 sm:h-7" />
					</button>
				</div>
			</div>

			<style jsx>{`
				.perspective-1000 {
					perspective: 2000px;
				}

				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease-out;
				}

				.line-clamp-3 {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</section>
	);
}
