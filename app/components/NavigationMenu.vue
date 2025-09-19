<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.ts'

const showMenu = shallowRef(false)
const { signOut } = useAuthStore()

const menuItems = [
	{
		name: 'Top',
		to: { name: 'index' },
		icon: 'carbon:home',
	},
] as const

function toggleMenu(): void {
	showMenu.value = !showMenu.value
}

function closeMenu(): void {
	showMenu.value = false
}
</script>

<template>
	<nav>
		<!-- Desktop Menu -->
		<div class="desktop-menu">
			<NuxtLink
				v-for="item in menuItems"
				:key="item.name"
				:to="item.to"
				class="menu-link"
			>
				<Icon :name="item.icon" />
				{{ item.name }}
			</NuxtLink>

			<button
				type="button"
				class="menu-link"
				@click="signOut"
			>
				<Icon name="carbon:logout" />
				Logout
			</button>
		</div>

		<!-- Mobile Menu Button -->
		<div class="mobile-menu-btn">
			<button
				type="button"
				class="mobile-btn"
				aria-label="Toggle menu"
				@click="toggleMenu"
			>
				<div
					v-if="!showMenu"
					class="hamburger"
				>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
				<Icon
					v-else
					name="carbon:close"
					class="icon-close"
				/>
			</button>
		</div>

		<!-- Mobile Menu Dropdown -->
		<div
			v-show="showMenu"
			class="mobile-menu-dropdown"
		>
			<div class="mobile-menu-content">
				<div class="menu-header">
					<h2 class="menu-title">Menu</h2>
					<button
						type="button"
						class="close-btn"
						@click="closeMenu"
					>
						<Icon name="carbon:close" class="close-icon" />
					</button>
				</div>
				
				<div class="menu-list">
					<NuxtLink
						v-for="item in menuItems"
						:key="item.name"
						:to="item.to"
						class="mobile-menu-link"
						@click="closeMenu"
					>
						<div class="menu-item-content">
							<Icon
								:name="item.icon"
								class="menu-icon"
							/>
							<span class="menu-text">{{ item.name }}</span>
						</div>
					</NuxtLink>

					<button
						type="button"
						class="mobile-menu-link logout-btn"
						@click="signOut"
					>
						<div class="menu-item-content">
							<Icon
								name="carbon:logout"
								class="menu-icon"
							/>
							<span class="menu-text">Logout</span>
						</div>
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
/* Desktop Menu */
.desktop-menu {
	display: none;
	block-size: 3.5rem;
	padding-inline: 1rem;
	padding-block: 0.5rem;
	justify-content: space-between;
	background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
	box-shadow: 0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -1px oklch(0% 0 0 / 0.06);

	.menu-link {
		display: flex;
		padding-inline: 0.75rem;
		padding-block: 0.5rem;
		border: none;
		border-radius: 0.75rem;
		align-items: center;
		gap: 0.5rem;
		font: inherit;
		font-weight: 600;
		color: oklch(45% 0.02 120);
		background: none;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		cursor: pointer;

		&:hover {
			color: oklch(30% 0.15 140);
			background: linear-gradient(135deg, oklch(98% 0.05 140) 0%, oklch(96% 0.08 160) 100%);
			transform: translateY(-1px);
		}
	}
}

@media (min-width: 768px) {
	.desktop-menu {
		display: flex;
	}
	.mobile-menu-btn,
	.mobile-menu-dropdown {
		display: none !important;
	}
}

/* Mobile Menu Button */
.mobile-menu-btn {
	position: fixed;
	z-index: 50;
	inset-inline-end: 1rem;
	inset-block-start: 1rem;
	display: block;

	.mobile-btn {
		position: relative;
		display: flex;
		inline-size: 3.5rem;
		block-size: 3.5rem;
		border: none;
		border-radius: 1rem;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		color: oklch(30% 0.15 140);
		background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
		box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15), 0 2px 4px oklch(0% 0 0 / 0.1);
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		cursor: pointer;

		&::before {
			position: absolute;
			inset: 0;
			opacity: 0;
			background: linear-gradient(135deg, oklch(70% 0.15 140 / 0.05) 0%, oklch(60% 0.2 160 / 0.03) 100%);
			transition: opacity 0.3s ease;
			pointer-events: none;
			content: '';
		}

		&:hover {
			color: oklch(25% 0.2 140);
			box-shadow: 0 8px 20px oklch(0% 0 0 / 0.2), 0 4px 8px oklch(0% 0 0 / 0.15);
			transform: translateY(-2px) scale(1.05);

			&::before {
				opacity: 1;
			}
		}

		&:active {
			transform: translateY(-1px) scale(1.02);
		}

		.hamburger {
			position: relative;
			z-index: 1;
			display: flex;
			inline-size: 1.5rem;
			block-size: 1.25rem;
			flex-direction: column;
			justify-content: space-between;

			.bar {
				inline-size: 100%;
				block-size: 3px;
				border-radius: 2px;
				background: currentColor;
				transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			}
		}

		.icon-close {
			position: relative;
			z-index: 1;
			inline-size: 1.5rem;
			block-size: 1.5rem;
		}
	}
}

/* Mobile Menu Dropdown */
.mobile-menu-dropdown {
	position: fixed;
	z-index: 40;
	inset: 0;
	display: flex;
	flex-direction: column;
	background: linear-gradient(135deg, oklch(100% 0 0 / 0.95) 0%, oklch(99% 0.01 120 / 0.95) 100%);
	backdrop-filter: blur(12px);
	animation: slideInDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu-content {
	position: relative;
	display: flex;
	inline-size: 100%;
	max-inline-size: 24rem;
	margin-inline: auto;
	margin-block-start: 2rem;
	padding: 2rem;
	border-radius: 1.5rem;
	flex-direction: column;
	overflow: hidden;
	background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
	box-shadow: 0 20px 25px -5px oklch(0% 0 0 / 0.1), 0 10px 10px -5px oklch(0% 0 0 / 0.04);
}

.mobile-menu-content::before {
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, oklch(70% 0.15 140 / 0.03) 0%, oklch(60% 0.2 160 / 0.02) 100%);
	pointer-events: none;
	content: '';
}

.menu-header {
	position: relative;
	z-index: 1;
	display: flex;
	margin-block-end: 2rem;
	align-items: center;
	justify-content: space-between;
}

.menu-title {
	font-family: 'SF Pro Display', -apple-system, system-ui, sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
}

.close-btn {
	display: flex;
	inline-size: 2.5rem;
	block-size: 2.5rem;
	border: none;
	border-radius: 0.75rem;
	align-items: center;
	justify-content: center;
	color: oklch(45% 0.02 120);
	background: linear-gradient(135deg, oklch(95% 0.02 120) 0%, oklch(92% 0.05 120) 100%);
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;

	&:hover {
		color: oklch(30% 0.15 140);
		background: linear-gradient(135deg, oklch(90% 0.05 120) 0%, oklch(88% 0.08 120) 100%);
		transform: scale(1.05);
	}
}

.close-icon {
	inline-size: 1.25rem;
	block-size: 1.25rem;
}

.menu-list {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.mobile-menu-link {
	display: flex;
	padding: 0;
	border: none;
	border-radius: 1rem;
	text-decoration: none;
	color: inherit;
	background: none;
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;

	&:hover {
		background: linear-gradient(135deg, oklch(98% 0.05 140) 0%, oklch(96% 0.08 160) 100%);
		box-shadow: 0 4px 12px oklch(0% 0 0 / 0.1);
		transform: translateY(-1px);
	}
}

.menu-item-content {
	display: flex;
	inline-size: 100%;
	padding-inline: 1.25rem;
	padding-block: 1rem;
	align-items: center;
	gap: 1rem;
}

.menu-icon {
	inline-size: 1.5rem;
	block-size: 1.5rem;
	color: oklch(60% 0.15 140);
	transition: color 0.3s ease;
}

.menu-text {
	font-size: 1.125rem;
	font-weight: 600;
	color: oklch(30% 0.02 120);
	transition: color 0.3s ease;
}

.mobile-menu-link:hover .menu-icon {
	color: oklch(50% 0.2 160);
}

.mobile-menu-link:hover .menu-text {
	color: oklch(25% 0.15 140);
}

.logout-btn:hover .menu-icon {
	color: oklch(60% 0.15 30);
}

.logout-btn:hover .menu-text {
	color: oklch(30% 0.15 30);
}

/* Animations */
@keyframes slideInDown {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.mobile-menu-btn {
		inset-inline-end: 0.75rem;
		inset-block-start: 0.75rem;
	}

	.mobile-btn {
		inline-size: 3rem;
		block-size: 3rem;
	}

	.mobile-menu-content {
		margin-block-start: 1rem;
		padding: 1.5rem;
	}

	.menu-title {
		font-size: 1.25rem;
	}

	.menu-item-content {
		padding-inline: 1rem;
		padding-block: 0.875rem;
	}

	.menu-text {
		font-size: 1rem;
	}
}
</style>