import type { Question } from 'inquirer';
import type { PlainObject } from 'js-utils-kit';
import type { Ctx, HookName } from '.';

/**
 * Extended Inquirer prompt definition with optional CI fallback support.
 *
 * @remarks
 * When running in non-interactive environments (e.g., CI), the `fallback` function is used to provide a value instead of prompting the user.
 */
type PromptWithFallback = Question & {
  /**
   * Fallback value resolver used when prompts cannot be displayed.
   */
  fallback?: <T = unknown>(ctx: Ctx) => T | Promise<T>;
};

export type Fn<C extends PlainObject, R = void, Args extends unknown[] = []> = (
  this: Plugin<C>,
  ctx: Ctx,
  config: C,
  ...args: Args
) => R | Promise<R>;

export type PluginKeys = keyof Plugin<PlainObject>;

export interface Plugin<C extends PlainObject = PlainObject> {
  /**
   * Unique name of the plugin.
   */
  name: string;

  /**
   * Controls whether the plugin is active.
   *
   * - `true` → plugin participates in execution
   * - `false` → plugin is skipped entirely
   */
  isEnabled: boolean;

  /**
   * Hook handlers mapped by lifecycle hook name.
   *
   * Each handler is executed when its corresponding hook is triggered.
   *
   * @example
   * ```ts
   * hooks: {
   *   'before:init'(ctx, config) {
   *     // custom logic
   *   }
   * }
   * ```
   */
  hooks?: Partial<Record<HookName, Fn<C>>>;

  /**
   * Declarative prompt definitions for this plugin.
   *
   * - In interactive mode → prompts user (inquirer)
   * - In CI → uses fallback/default values
   */
  prompts?: PromptWithFallback[];

  /**
   * Runs at the start of the execution lifecycle.
   *
   * Common use cases include:
   * - validating environment conditions
   * - performing pre-run checks
   * - preparing external dependencies
   */
  pre?: Fn<C>;

  /**
   * Runs when the plugin is initialized.
   *
   * Common use cases include:
   * - preparing internal state
   * - normalizing or validating configuration
   * - initializing resources
   */
  init?: Fn<C>;

  /**
   * Validates plugin state and configuration.
   *
   * @remarks
   * Should throw errors if requirements are not met.
   */
  validate?: Fn<C>;

  /**
   * Retrieves the current version.
   */
  getVersion?: Fn<C>;

  /**
   * Persists the updated version.
   *
   * @remarks
   * Typically writes version to files (e.g., package.json).
   */
  setVersion?: Fn<C>;

  /**
   * Computes the next version.
   */
  bumpVersion?: Fn<C>;

  /**
   * Generates changelog content.
   */
  generateChangelog?: Fn<C>;

  /**
   * Writes changelog to disk or external destination.
   */
  writeChangelog?: Fn<C>;

  /**
   * Handles git-related operations.
   *
   * @remarks
   * Examples:
   * - Commit changes
   * - Create tags
   * - Push to remote
   */
  git?: Fn<C>;

  /**
   * Publishes the package or artifact.
   *
   * @remarks
   * Examples:
   * - npm publish
   * - Docker push
   * - Release creation
   */
  publish?: Fn<C>;

  /**
   * Runs at the end of the execution lifecycle.
   *
   * Common use cases include:
   * - cleaning up resources
   * - removing temporary artifacts
   * - logging summaries or results
   */
  post?: Fn<C>;
}
